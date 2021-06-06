package com.backend.Logic;

import il.ac.bgu.cs.bp.bpjs.execution.listeners.BProgramRunnerListenerAdapter;
import il.ac.bgu.cs.bp.bpjs.model.BEvent;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class GraphBProgramRunnerListener extends BProgramRunnerListenerAdapter {

    private SseEmitter emitter;

    public GraphBProgramRunnerListener(SseEmitter emitter){
        this.emitter = emitter;
    }

    @Override
    public void eventSelected(BProgram bp, BEvent theEvent){
        try {
            Map<String,Object> dateToSend = new HashMap<>();
            dateToSend.put("name", theEvent.getName());
            dateToSend.put("data", theEvent.getData());

            //emitter.send(SseEmitter.event().name("flowEvent").data(theEvent.getName()+theEvent.getData().toString()));
            emitter.send(SseEmitter.event().name("flowEvent").data(dateToSend));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void ended(BProgram bp){
        try {
            Map<String,Object> dateToSend = new HashMap<>();
            dateToSend.put("name", "Program execution ended.");
            emitter.send(SseEmitter.event().name("flowEvent").data(dateToSend));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void halted(BProgram bp){
        try {
            Map<String,Object> dateToSend = new HashMap<>();
            dateToSend.put("name", "Program execution halted.");
            emitter.send(SseEmitter.event().name("flowEvent").data(dateToSend));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
