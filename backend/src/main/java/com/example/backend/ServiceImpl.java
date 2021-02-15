package com.example.backend;

import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.PrintBProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.ResourceBProgram;
import il.ac.bgu.cs.bp.bpjs.model.StringBProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;

public class ServiceImpl implements IService {

    @Override
    public void run(Graph graph, SseEmitter emitter) {
//        String src =
//                "bp.registerBThread(function(){\n" +
//                "    bp.sync( {request:bp.Event(\"Hello,\")} );\n" +
//                "} );\n" +
//                "\n" +
//                "bp.registerBThread(function(){\n" +
//                "    bp.sync( {request:bp.Event(\"World!\")} );\n" +
//                "} );\n" +
//                "\n" +
//                "bp.registerBThread(function(){\n" +
//                "    bp.sync( {waitFor:bp.Event(\"Hello,\"),\n" +
//                "                block:bp.Event(\"World!\")} );\n" +
//                "} );";
        String src = parseGraph(graph);
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
    public void debug(Graph graph, SseEmitter serverEmitter) {
        return;
    }

    //parse graph to bpjs source code
    private String parseGraph(Graph graph){
        StringBuilder code = new StringBuilder();
        List<Node> startNodes = findStartNodes(graph);

        for (Node n: startNodes){
            code.append(generateCodeFromStartNode(graph, n)).append('\n');
        }

        return code.toString();
    }

    private String generateCodeFromStartNode(Graph g, Node n) {
        StringBuilder body = new StringBuilder();
        Node cur = n;
        while ((cur = getNextNode(g, cur)) != null){
            Data data = cur.getData();
            body.append("bp.sync( {");
            // TODO: fix comma
            if(!data.getRequest().equals("")){
                body.append(String.format("request:bp.Event(\"%s\")", data.getRequest()));
            }
            if(!data.getWait().equals("")){
                body.append(String.format("waitFor:bp.Event(\"%s\"), ", data.getWait()));
            }
            if(!data.getBlock().equals("")){
                body.append(String.format("block:bp.Event(\"%s\")", data.getBlock()));
            }

            body.append("} );\n");
        }


        return String.format("bp.registerBThread(function(){\n\t%s } );\n", body.toString());
    }
    
    private Node getNextNode(Graph g, Node cur) {
        Collection<Object> outputs = cur.getOutputs().values();
        //Collection<Map<String, ArrayList<Map<String, Object>>>>
        Map<String, ArrayList<Map<String, Object>>> output = (Map<String, ArrayList<Map<String, Object>>>) outputs.toArray()[0];
        ArrayList<Map<String, Object>> connections = output.get("connections");
        if(connections.size() == 0) {
            return null;
        }
        Map<String, Object> connection = connections.get(0);
        int nextNodeID = (int) connection.get("node");
        return g.getNode(nextNodeID);
    }

    private List<Node> findStartNodes(Graph graph) {
        List<Node> startNodes = new LinkedList<>();
        for (Node n: graph.getNodes().values()) {
            if(n.getName().equals("Start")){
                startNodes.add(n);
            }
        }
        return startNodes;
    }
}
