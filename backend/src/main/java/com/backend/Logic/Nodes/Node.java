package com.backend.Logic.Nodes;

import com.backend.Logic.Input;
import com.backend.Logic.Output;
import com.backend.Models.NodeModel;

import java.util.*;

public abstract class Node {

    private int id;
    private Data data;
    private List<Input> inputs;
    private Output output;
    private String type;

    protected Node(int id, Data data, List<Input> inputs, Output output, String type) {
        this.id = id;
        this.data = data;
        this.inputs = inputs;
        this.output = output;
        this.type = type;
    }

    public static Node Create(NodeModel nodeModel) {
        String type = nodeModel.getName();
        Node result = null;
        switch (type){
            case "Bsync":
                result = BSyncNode.Create(nodeModel);
                break;
            case "Start":
                result = StartNode.Create(nodeModel);
                break;
        }
        return result;
    }

    protected static List<Input> CreateInputs(Map<String, Object> inputsModel){
        List<Input> inputs = new LinkedList<>();
        for (Object inputModel: inputsModel.values()){
            Map<String, ArrayList<Map<String, Object>>> inputModelTyped = (Map<String, ArrayList<Map<String, Object>>>) inputModel;
            ArrayList<Map<String, Object>> connections = inputModelTyped.get("connections");
            if(connections.size() == 0) {
                continue;
            }
            Map<String, Object> connection = connections.get(0);
            Input input = new Input((int)connection.get("node"), (String)connection.get("output"), (Map<String, Object>) connection.get("data"));
            inputs.add(input);
        }
        return inputs;
    }

    protected static Output CreateOutput(Map<String, Object> outputsMap) {
        Collection<Object> outputs = outputsMap.values();
        Map<String, ArrayList<Map<String, Object>>> output = (Map<String, ArrayList<Map<String, Object>>>) outputs.toArray()[0];
        ArrayList<Map<String, Object>> connections = output.get("connections");
        if(connections.size() == 0) {
            return null;
        }
        Map<String, Object> connection = connections.get(0);
        return new Output((int)connection.get("node"), (String)connection.get("input"), (Map<String, Object>) connection.get("data"));
    }
    public abstract String parseToCode(Map<Integer, Node> nodes);

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

    public Output getOutput() {
        return output;
    }

    public void setOutput(Output output) {
        this.output = output;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
