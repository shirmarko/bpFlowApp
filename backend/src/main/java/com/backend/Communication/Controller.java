package com.backend.Communication;

import java.io.IOException;

import com.backend.Logic.IService;
import com.backend.Logic.ServiceImpl;
import com.backend.Models.GraphModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@CrossOrigin
public class Controller {
    private GraphModel myGraphModel = null;
    public SseEmitter serverEmitter = null;
    private IService service = new ServiceImpl();

    @PostMapping(value = "/run", consumes = "application/json", produces = "application/json")
    public String run(@RequestBody GraphModel graphModel){
        this.myGraphModel = graphModel;
        service.run(graphModel, serverEmitter);

        return "ok";
    }

    @PostMapping(value = "/debug", consumes = "application/json", produces = "application/json")
    public String debug(@RequestBody GraphModel graphModel){
        this.myGraphModel = graphModel;
        service.debug(graphModel, serverEmitter);

        return "ok";
    }

    @PostMapping(value = "/step", consumes = "application/json", produces = "application/json")
    public String step(@RequestBody String graphID){
        service.step(graphID);

        return "ok";
    }

    @PostMapping(value = "/stop", consumes = "application/json", produces = "application/json")
    public String stop(@RequestBody String graphID){
        service.stop(graphID);

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
