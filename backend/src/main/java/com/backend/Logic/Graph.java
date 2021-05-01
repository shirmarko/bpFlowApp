package com.backend.Logic;

import com.backend.Logic.Nodes.GeneralNode;
import com.backend.Models.GraphModel;
import com.backend.Models.NodeModel;

import java.util.HashMap;
import java.util.Map;

public class Graph {
    private String id;
    private Map<Integer, GeneralNode> nodes;

    private Graph(String graphID, Map<Integer, GeneralNode> nodes){
        this.id = graphID;
        this.nodes = nodes;
    }

    public static Graph Create(GraphModel model){
        Map<Integer, GeneralNode> nodes = new HashMap<>();
        Map<String, NodeModel> nodesModel = model.getNodes();
        for(String id: nodesModel.keySet()){
            //nodes.put(Integer.valueOf(id), GeneralNode.Create(nodesModel.get(id)));
        }
        return new Graph(model.getId(), nodes);
    }

    @Override
    public String toString() {
        return "{" +
                "id:" + this.id + ",\n" +
                "nodes:" + this.nodes + ",\n" +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<Integer, GeneralNode> getNodes() {
        return nodes;
    }

    public void setNodes(Map<Integer, GeneralNode> nodes) {
        this.nodes = nodes;
    }

    public GeneralNode getNode(int id){
        return this.nodes.get(id);
    }

//    public String parseToCode() {
//        StringBuilder code = new StringBuilder();
//        List<StartGeneralNode> startNodes = this.findStartNodes();
//
//        for (StartGeneralNode n: startNodes){
//            code.append(n.parseToCode(this.getNodes())).append("\n");
//        }
//
//        return code.toString();
//    }

//    private List<StartGeneralNode> findStartNodes() {
//        List<StartGeneralNode> startNodes = new LinkedList<>();
//        for (GeneralNode n: this.nodes.values()) {
//            if(n.getType().equals("Start")){
//                startNodes.add((StartGeneralNode)n);
//            }
//        }
//        return startNodes;
//    }
}
