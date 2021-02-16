package com.example.backend.Logic;

import com.example.backend.Models.GraphModel;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface IService {

    void run(GraphModel graphModel, SseEmitter serverEmitter);
    void debug(GraphModel graphModel, SseEmitter serverEmitter);

}
