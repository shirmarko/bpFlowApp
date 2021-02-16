package com.example.backend.Models;

import java.util.Arrays;
import java.util.Map;

public class NodeModel {

    private String id;
    private DataModel data;
    private Map<String, Object> inputs;
    private Map<String, Object> outputs;
    private double[] position;
    private String name;

    public NodeModel(String id, DataModel data, Map<String, Object> inputs, Map<String, Object> outputs, double[] positions, String name) {
        this.id = id;
        this.data = data;
        this.inputs = inputs;
        this.outputs = outputs;
        this.position = positions;
        this.name = name;
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

    public Map<String, Object> getInputs() {
        return inputs;
    }

    public void setInputs(Map<String, Object> inputs) {
        this.inputs = inputs;
    }

    public Map<String, Object> getOutputs() {
        return outputs;
    }

    public void setOutputs(Map<String, Object> outputs) {
        this.outputs = outputs;
    }

    public double[] getPosition() {
        return position;
    }

    public void setPosition(double[] position) {
        this.position = position;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "NodeModel{" +
                "id:'" + id + '\'' +
                ", data:" + data +
                ", inputs:" + inputs +
                ", outputs:" + outputs +
                ", position:" + Arrays.toString(position) +
                ", name:'" + name + '\'' +
                '}';
    }
}
