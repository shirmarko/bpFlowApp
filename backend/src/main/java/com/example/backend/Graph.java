package com.example.backend;

import java.util.Arrays;
import java.util.Objects;
import java.util.Map;

public class Graph {
    private String graphID;
    private String[] comments;
    private Map<String, Map<String, Object>> nodes;

    public Graph(String graphID, String[] comments, Map<String, Map<String, Object>> nodes){
        this.graphID = graphID;
        this.comments = comments;
        this.nodes = nodes;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + this.graphID + ",\n" +
                "comments=" + Arrays.toString(this.comments) + ",\n" +
                "nodes=" + Objects.toString(this.nodes) + ",\n" +
                '}';
    }

    // public String mapToString(Map<String, Map> map){
    //     StringBuilder mapAsString = new StringBuilder("{");
    //     for( String key : map.keySet()){
    //         mapAsString.append(key + "=" + map.get(key) + ", ");
    //     }
    //     mapAsString.delete(mapAsString.length()-2, mapAsString.length()).append("}");
    //     return mapAsString.toString();
    // }


    

    /**
     * @return String return the graphID
     */
    public String getGraphID() {
        return graphID;
    }

    /**
     * @param graphID the graphID to set
     */
    public void setGraphID(String graphID) {
        this.graphID = graphID;
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
     * @return Map<String, Map> return the nodes
     */
    public Map<String, Map<String, Object>> getNodes() {
        return nodes;
    }

    /**
     * @param nodes the nodes to set
     */
    public void setNodes(Map<String, Map<String, Object>> nodes) {
        this.nodes = nodes;
    }

}
