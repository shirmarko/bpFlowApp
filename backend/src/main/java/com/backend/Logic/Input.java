package com.backend.Logic;

import java.util.Map;

public class Input {

    private int nodeID;
    private String output;
    Map<String, Object> data;

    public Input(int nodeID, String output, Map<String, Object> data) {
        this.nodeID = nodeID;
        this.output = output;
        this.data = data;
    }


    public int getNodeID() {
        return nodeID;
    }

    public void setNodeID(int nodeID) {
        this.nodeID = nodeID;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
