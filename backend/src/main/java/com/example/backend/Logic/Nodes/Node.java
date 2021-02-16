package com.example.backend.Logic;

import java.util.List;

public abstract class Node {

    private int id;
    private Data data;
    private List<Input> inputs;
    private Output outputs;
    private String type;

    public Node(int id, Data data, List<Input> inputs, Output outputs, String type) {
        this.id = id;
        this.data = data;
        this.inputs = inputs;
        this.outputs = outputs;
        this.type = type;
    }

    public abstract String parseToCode();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public List<Input> getInputs() {
        return inputs;
    }

    public void setInputs(List<Input> inputs) {
        this.inputs = inputs;
    }

    public Output getOutputs() {
        return outputs;
    }

    public void setOutputs(Output outputs) {
        this.outputs = outputs;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
