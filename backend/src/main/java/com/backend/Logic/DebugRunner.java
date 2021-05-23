package com.backend.Logic;

import il.ac.bgu.cs.bp.bpjs.exceptions.BPjsRuntimeException;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.BProgramSyncSnapshot;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.eventselection.EventSelectionResult;
import il.ac.bgu.cs.bp.bpjs.model.eventselection.EventSelectionStrategy;

import java.io.IOException;
import java.util.*;

import static java.util.Collections.reverseOrder;

import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.internal.ExecutorServiceMaker;
import il.ac.bgu.cs.bp.bpjs.model.SafetyViolationTag;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

public class DebugRunner{

    private static final AtomicInteger INSTANCE_COUNTER = new AtomicInteger(0);
    private final int instanceNum = INSTANCE_COUNTER.incrementAndGet();
    private ExecutorService execSvc = null;
    private BProgram bprog = null;
    private final List<BProgramRunnerListener> listeners = new ArrayList<>();
    private SafetyViolationTag failedAssertion;
    private final AtomicBoolean go = new AtomicBoolean(true);
    private volatile boolean halted;
    private SseEmitter emitter;
    private BProgramSyncSnapshot curSnapshot;
    private Map<String, Boolean> doneData;


    public DebugRunner(){
        this(null, null);
    }
    public DebugRunner(BProgram aBProgram, SseEmitter emitter) {
        bprog = aBProgram;
        this.emitter = emitter;
        this.doneData = new HashMap<>();
        this.doneData.put("isDone", true);
        if ( bprog!=null ) {
            bprog.setAddBThreadCallback( (bp,bt)->listeners.forEach(l->l.bthreadAdded(bp, bt)));
        }
    }

    public void initDebug() {
        // setup bprogram and runtime parts.
        execSvc = ExecutorServiceMaker.makeWithName("BProgramRunner-" + instanceNum );
        failedAssertion = null;
        listeners.forEach(l -> l.starting(bprog));
        curSnapshot = bprog.setup();
        curSnapshot.getBThreadSnapshots().forEach(sn->listeners.forEach( l -> l.bthreadAdded(bprog, sn)) );

        // start it
        go.set(true);
        halted = false;
        listeners.forEach(l -> l.started(bprog));
        try {
            curSnapshot = curSnapshot.start(execSvc, bprog.getStorageModificationStrategy());
        } catch (InterruptedException itr) {
            System.err.println("BProgramRunner interrupted: " + itr.getMessage() );
            execSvc.shutdown();
        }

        if ( ! curSnapshot.isStateValid() ) {
            failedAssertion = curSnapshot.getViolationTag();
            listeners.forEach( l->l.assertionFailed(bprog, failedAssertion));
            go.set(false);
        }

        if ( (!curSnapshot.noBThreadsLeft()) && go.get() ) {
            Optional<Map> dataToSend = bprog.getFromGlobalScope("nodesLists", Map.class);
            if (dataToSend.isPresent()) {
                try {
                    emitter.send(SseEmitter.event().name("step").data(dataToSend.get()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                go.set(false);
            }
        }
    }

    //return if the program is ended
    public boolean step() throws IOException {
        try {
            // while snapshot not empty, select an event and get the next snapshot.
            if ( (!curSnapshot.noBThreadsLeft()) && go.get() ) {

                // see which events are selectable
                Set<BEvent> possibleEvents = bprog.getEventSelectionStrategy().selectableEvents(curSnapshot);
                if ( possibleEvents.isEmpty() ) {
                    // Superstep done: No events available for selection.

                    if ( bprog.isWaitForExternalEvents() ) {
                        listeners.forEach( l->l.superstepDone(bprog) );
                        BEvent next = bprog.takeExternalEvent(); // and now we wait for external event
                        if ( next == null ) {
                            go.set(false); // program no longer waits for external events
                        } else {
                            curSnapshot.getExternalEvents().add(next);
                        }

                    } else {
                        // Ending the program - no selectable event.
                        listeners.forEach(l->l.ended(bprog));
                        go.set(false);
                        emitter.send(SseEmitter.event().name("step").data(doneData));
                        return true;
                    }

                } else {
                    // we can select some events - select one and advance.
                    Optional<EventSelectionResult> res = bprog.getEventSelectionStrategy().select(curSnapshot, possibleEvents);

                    if ( res.isPresent() ) {
                        EventSelectionResult esr = res.get();

                        if ( ! esr.getIndicesToRemove().isEmpty() ) {
                            // the event selection affected the external event queue.
                            List<BEvent> updatedExternals = new ArrayList<>(curSnapshot.getExternalEvents());
                            esr.getIndicesToRemove().stream().sorted(reverseOrder())
                                    .forEach( idxObj -> updatedExternals.remove(idxObj.intValue()) );
                            curSnapshot = curSnapshot.copyWith(updatedExternals);
                        }

                        curSnapshot = curSnapshot.triggerEvent(esr.getEvent(), execSvc, listeners, bprog.getStorageModificationStrategy());
                        if ( ! curSnapshot.isStateValid() ) {
                            failedAssertion = curSnapshot.getViolationTag();
                            listeners.forEach( l->l.assertionFailed(bprog, failedAssertion));
                            go.set(false);
                        }

                    } else {
                        // edge case: we can select events, but we didn't. Might be a bug in the EventSelectionStrategy.
                        go.set(false);
                    }
                }

                Optional<Map> dataToSend = bprog.getFromGlobalScope("nodesLists", Map.class);
                if(dataToSend.isPresent()){
                    emitter.send(SseEmitter.event().name("step").data(dataToSend.get()));
                }
                else{
                    go.set(false);
                }

                return false;
            }
            else if(halted){
                listeners.forEach(l->l.halted(bprog));
                execSvc.shutdown();
                emitter.send(SseEmitter.event().name("step").data(doneData));
                return true;
            }
            else{
                listeners.forEach(l->l.ended(bprog));
                execSvc.shutdown();
                emitter.send(SseEmitter.event().name("step").data(doneData));
                return true;
            }

        } catch ( BPjsRuntimeException bre ) {
            listeners.forEach( l -> l.error(bprog, bre));
            execSvc.shutdown();
            emitter.send(SseEmitter.event().name("step").data(doneData));
            return true;
        } catch (InterruptedException itr) {
            System.err.println("BProgramRunner interrupted: " + itr.getMessage() );
            execSvc.shutdown();
            emitter.send(SseEmitter.event().name("step").data(doneData));
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            emitter.send(SseEmitter.event().name("step").data(doneData));
            execSvc.shutdown();
            return true;
        }
    }

    /**
     * Halts the running b-program. The program will terminate on the next
     * synchronization point.
     */
    public void halt() {
        halted=true;
        go.set(false);
    }

    /**
     * @return {@code true} iff the program has terminated because of
     * a failed assertion, {@code false} otherwise.
     */
    public boolean hasFailedAssertion() {
        return failedAssertion!=null;
    }

    public SafetyViolationTag getFailedAssertion() {
        return failedAssertion;
    }

    public BProgram getBProgram() {
        return bprog;
    }

    public void setBProgram(BProgram aBProgram) {
        bprog = aBProgram;
        if ( bprog!=null ) {
            bprog.setAddBThreadCallback( (bp,bt)->listeners.forEach(l->l.bthreadAdded(bp, bt)));
        }
    }

    /**
     * Adds a listener to the BProgram.
     * @param <R> Actual type of listener.
     * @param aListener the listener to add.
     * @return The added listener, to allow call chaining.
     */
    public <R extends BProgramRunnerListener> R addListener(R aListener) {
        listeners.add(aListener);
        return aListener;
    }

    /**
     * Removes the listener from the program. If the listener is not registered,
     * this call is ignored. In other words, this call is idempotent.
     * @param aListener the listener to remove.
     */
    public void removeListener(BProgramRunnerListener aListener) {
        listeners.remove(aListener);
    }

    public void stop() {
        halted = true;
        listeners.forEach(l->l.halted(bprog));
        execSvc.shutdown();
    }
}
