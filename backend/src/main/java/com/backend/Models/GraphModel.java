package com.backend.Models;

import java.util.Arrays;
import java.util.Map;

public class GraphModel {
    private String id;
    private String[] comments;
    private Map<String, NodeModel> nodes;

    public GraphModel(String graphID, String[] comments, Map<String, NodeModel> nodes){
        this.id = graphID;
        this.comments = comments;
        this.nodes = nodes;
    }

    @Override
    public String toString() {
        return "{" +
                "id:" + this.id + ",\n" +
                "comments:" + Arrays.toString(this.comments) + ",\n" +
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
    public String[] getComments() {
        return comments;
    }

    /**
     * @param comments the comments to set
     */
    public void setComments(String[] comments) {
        this.comments = comments;
    }

    /**
     * @return Map<String, NodeModel> return the nodes
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
