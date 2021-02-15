package com.example.backend;

import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.PrintBProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.ResourceBProgram;
import il.ac.bgu.cs.bp.bpjs.model.StringBProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class ServiceImpl implements IService {

    @Override
    public void run(Graph graph, SseEmitter emitter) {
        String src =
                "bp.registerBThread( \"helloBT\", function(){\n" +
                "    bp.sync( {request:bp.Event(\"Hello,\")} );\n" +
                "} );\n" +
                "\n" +
                "bp.registerBThread( \"worldBT\", function(){\n" +
                "    bp.sync( {request:bp.Event(\"World!\")} );\n" +
                "} );\n" +
                "\n" +
                "bp.registerBThread( \"arbiter\", function(){\n" +
                "    bp.sync( {waitFor:bp.Event(\"Hello,\"),\n" +
                "                block:bp.Event(\"World!\")} );\n" +
                "} );";
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
    public void debug(Graph graph, SseEmitter serverEmitter) {
        return;
    }
}
