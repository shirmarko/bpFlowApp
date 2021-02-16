package com.backend.Logic;

import com.backend.Models.DataModel;
import com.backend.Models.GraphModel;
import com.backend.Models.NodeModel;
import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.StringBProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;

public class ServiceImpl implements IService {

    @Override
    public void run(GraphModel graphModel, SseEmitter emitter) {
        Graph graph = Graph.Create(graphModel);

        String src = graph.parseToCode();
        System.out.println(src);
        try{
            final BProgram bprog = new StringBProgram(src);
            BProgramRunner rnr = new BProgramRunner(bprog);

            // Print program events to the console
            rnr.addListener(new GraphBProgramRunnerListener(emitter));

            // go!
            rnr.run();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public void debug(GraphModel graphModel, SseEmitter serverEmitter) {
        return;
    }

}
