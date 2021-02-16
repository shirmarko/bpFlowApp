package com.example.backend.Logic;

import com.example.backend.Models.DataModel;
import com.example.backend.Models.GraphModel;
import com.example.backend.Models.NodeModel;
import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.StringBProgram;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;

public class ServiceImpl implements IService {

    @Override
    public void run(GraphModel graphModel, SseEmitter emitter) {
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
        String src = parseGraph(graphModel);
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

    //parse graphModel to bpjs source code
    private String parseGraph(GraphModel graphModel){
        StringBuilder code = new StringBuilder();
        List<NodeModel> startNodeModels = findStartNodes(graphModel);

        for (NodeModel n: startNodeModels){
            code.append(generateCodeFromStartNode(graphModel, n)).append('\n');
        }

        return code.toString();
    }

    private String generateCodeFromStartNode(GraphModel g, NodeModel n) {
        StringBuilder body = new StringBuilder();
        NodeModel cur = n;
        while ((cur = getNextNode(g, cur)) != null){
            DataModel data = cur.getData();
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
    
    private NodeModel getNextNode(GraphModel g, NodeModel cur) {
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

    private List<NodeModel> findStartNodes(GraphModel graphModel) {
        List<NodeModel> startNodeModels = new LinkedList<>();
        for (NodeModel n: graphModel.getNodes().values()) {
            if(n.getName().equals("Start")){
                startNodeModels.add(n);
            }
        }
        return startNodeModels;
    }
}
