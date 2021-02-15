package com.example.backend;

import java.io.IOException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@CrossOrigin
public class Controller {
    private Graph myGraph = null;
    public SseEmitter serverEmitter = null;
    private IService service = new ServiceImpl();

    @PostMapping(value = "/run", consumes = "application/json", produces = "application/json")
    public String run(@RequestBody Graph graph){
        this.myGraph = graph;
        System.out.println("got graph, start process... ");
        service.run(graph, serverEmitter);

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
        this.serverEmitter = sseEmitter;
        // emitters.add(sseEmitter);
        return sseEmitter;
    }

    
}
