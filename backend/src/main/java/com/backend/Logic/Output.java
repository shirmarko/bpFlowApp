package com.backend.Logic;

import java.util.Map;

public class Output {

    private int nodeID;
    private String input;
    Map<String, Object> data;

    public Output(int nodeID, String input, Map<String, Object> data) {
        this.nodeID = nodeID;
        this.input = input;
        this.data = data;
    }


    public int getNodeID() {
        return nodeID;
    }

    public void setNodeID(int nodeID) {
        this.nodeID = nodeID;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
