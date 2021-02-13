package com.example.backend;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@CrossOrigin
public class Controller {
    private Graph myGraph = null;
    public SseEmitter serverEmitter = null;

    @PostMapping(value = "/run", consumes = "application/json", produces = "application/json")
    public String run(@RequestBody Graph graph){
        this.myGraph = graph;
        // System.out.print("got graph:" + myGraph.toString());
        System.out.println("got graph, start process... ");
        int count = 0;
        try{
            while(count<10){
                System.out.println("send flowEvent... ");
                Thread.sleep(1000); // simulated delay
                serverEmitter.send(SseEmitter.event().name("flowEvent").data(count));
                count++;
            }
        }catch (IOException | InterruptedException e) {
            //the client stop listening
            serverEmitter=null;
        }
        return "ok";
    }


    //client subscription
    @RequestMapping( value = "/subscribe")
    public SseEmitter subscribe() {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try{
            sseEmitter.send(SseEmitter.event().name("init"));
        }catch (IOException e){
            e.printStackTrace();
        }
        sseEmitter.onCompletion(() -> serverEmitter=null);
        serverEmitter = sseEmitter;
        // emitters.add(sseEmitter);
        return sseEmitter;
    }

    
}
