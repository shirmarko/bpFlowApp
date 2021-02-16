package com.example.backend.Logic;

import com.example.backend.Logic.Nodes.Node;

import java.util.Map;

public class Graph {
    private String id;
    private Map<Integer, Node> nodes;

    public Graph(String graphID, Map<Integer, Node> nodes){
        this.id = graphID;
        this.nodes = nodes;
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
}
