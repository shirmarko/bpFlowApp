package com.backend.Models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public class NodeModel {

    private String id;
    private DataModel data;
    private ArrayList<String> inputs;
    private Map<String, ArrayList<String>> outputs;
    private String type;

    public NodeModel(String id, DataModel data, ArrayList<String> inputs, Map<String, ArrayList<String>> outputs, String type) {
        this.id = id;
        this.data = data;
        this.inputs = inputs;
        this.outputs = outputs;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DataModel getData() {
        return data;
    }

    public void setData(DataModel data) {
        this.data = data;
    }

    public ArrayList<String> getInputs() {
        return inputs;
    }

    public void setInputs(ArrayList<String> inputs) {
        this.inputs = inputs;
    }

    public Map<String, ArrayList<String>> getOutputs() {
        return outputs;
    }

    public void setOutputs(Map<String, ArrayList<String>> outputs) {
        this.outputs = outputs;
    }

    public String getType() {
        return type;
    }

    public void setType(String name) {
        this.type = name;
    }

    @Override
    public String toString() {
        return "NodeModel{" +
                "id:'" + id + '\'' +
                ", data:" + data +
                ", inputs:" + inputs +
                ", outputs:" + outputs +
                ", type:'" + type + '\'' +
                '}';
    }
}
