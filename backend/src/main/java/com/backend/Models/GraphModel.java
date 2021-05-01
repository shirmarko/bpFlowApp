package com.backend.Models;

import java.util.Arrays;
import java.util.Map;

public class GraphModel {
    private String id;
    private Map<String, NodeModel> nodes;

    public GraphModel(String graphID, Map<String, NodeModel> nodes){
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

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String[] return the comments
     */
    public Map<String, NodeModel> getNodes() {
        return nodes;
    }

    /**
     * @param nodes the nodes to set
     */
    public void setNodes(Map<String, NodeModel> nodes) {
        this.nodes = nodes;
    }

    public NodeModel getNode(int id){
        return this.nodes.get(String.valueOf(id));
    }
}
