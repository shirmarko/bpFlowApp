package com.example.backend;

import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListenerAdapter;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

public class GraphBProgramRunnerListener extends BProgramRunnerListenerAdapter {

    private SseEmitter emitter;

    public GraphBProgramRunnerListener(SseEmitter emitter){
        this.emitter = emitter;
    }

    @Override
    public void eventSelected(BProgram bp, BEvent theEvent){
        try {
            emitter.send(SseEmitter.event().name("flowEvent").data(theEvent.getName()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void started(BProgram bp){
        try {
            emitter.send(SseEmitter.event().name("flowEvent").data("bpflow started.."));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void ended(BProgram bp){
        try {
            emitter.send(SseEmitter.event().name("flowEvent").data("bpflow ended.."));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
