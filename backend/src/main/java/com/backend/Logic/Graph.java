package com.backend.Logic;

import com.backend.Logic.Nodes.Node;
import com.backend.Logic.Nodes.StartNode;
import com.backend.Models.GraphModel;
import com.backend.Models.NodeModel;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Graph {
    private String id;
    private Map<Integer, Node> nodes;

    private Graph(String graphID, Map<Integer, Node> nodes){
        this.id = graphID;
        this.nodes = nodes;
    }

    public static Graph Create(GraphModel model){
        Map<Integer, Node> nodes = new HashMap<>();
        Map<String, NodeModel> nodesModel = model.getNodes();
        for(String id: nodesModel.keySet()){
            nodes.put(Integer.valueOf(id), Node.Create(nodesModel.get(id)));
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

    public Map<Integer, Node> getNodes() {
        return nodes;
    }

    public void setNodes(Map<Integer, Node> nodes) {
        this.nodes = nodes;
    }

    public Node getNode(int id){
        return this.nodes.get(id);
    }

    public String parseToCode() {
        StringBuilder code = new StringBuilder();
        List<StartNode> startNodes = this.findStartNodes();

        for (StartNode n: startNodes){
            code.append(n.parseToCode(this.getNodes())).append("\n");
        }

        return code.toString();
    }

    private List<StartNode> findStartNodes() {
        List<StartNode> startNodes = new LinkedList<>();
        for (Node n: this.nodes.values()) {
            if(n.getType().equals("Start")){
                startNodes.add((StartNode)n);
            }
        }
        return startNodes;
    }
}
