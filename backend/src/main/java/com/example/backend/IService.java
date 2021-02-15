package com.example.backend;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface IService {

    void run(Graph graph, SseEmitter serverEmitter);
    void debug(Graph graph, SseEmitter serverEmitter);

}
