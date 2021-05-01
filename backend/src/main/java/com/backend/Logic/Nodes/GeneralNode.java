package com.backend.Logic.Nodes;

import com.backend.Logic.Input;
import com.backend.Logic.Output;
import com.backend.Models.NodeModel;

import java.util.*;
import java.util.stream.Collectors;

public class GeneralNode {

    private int id;
    private Data data;
    private ArrayList<Integer> inputs;
    private ArrayList<Integer> output;
    private String type;

    private GeneralNode(int id, Data data, ArrayList<Integer> inputs, ArrayList<Integer> output, String type) {
        this.id = id;
        this.data = data;
        this.inputs = inputs;
        this.output = output;
        this.type = type;
    }

//    public static GeneralNode Create(NodeModel nodeModel) {
//        Data data = new Data(nodeModel.getData().getCode());
//        Integer [] inputs = (Integer[]) (nodeModel.getInputs().stream().map(Integer::parseInt).toArray());
//        return new GeneralNode(Integer.parseInt(nodeModel.getId()), data, inputs, outputs, nodeModel.getName());
//    }




//    private static List<Input> CreateInputs(Map<String, Object> inputsModel){
//        List<Input> inputs = new LinkedList<>();
//        for (Object inputModel: inputsModel.values()){
//            Map<String, ArrayList<Map<String, Object>>> inputModelTyped = (Map<String, ArrayList<Map<String, Object>>>) inputModel;
//            ArrayList<Map<String, Object>> connections = inputModelTyped.get("connections");
//            if(connections.size() == 0) {
//                continue;
//            }
//            Map<String, Object> connection = connections.get(0);
//            Input input = new Input((int)connection.get("node"), (String)connection.get("output"), (Map<String, Object>) connection.get("data"));
//            inputs.add(input);
//        }
//        return inputs;
//    }

//    private static List<Output> CreateOutput(Map<String, Object> outputsModel) {
//        List<Output> outputs = new LinkedList<>();
//        for (Object outputModel: outputsModel.values()){
//            Map<String, ArrayList<Map<String, Object>>> inputModelTyped = (Map<String, ArrayList<Map<String, Object>>>) outputModel;
//            ArrayList<Map<String, Object>> connections = inputModelTyped.get("connections");
//            if(connections.size() == 0) {
//                continue;
//            }
//            Map<String, Object> connection = connections.get(0);
//                Output output = new Output((int)connection.get("node"), (String)connection.get("input"), (Map<String, Object>) connection.get("data"));
//            outputs.add(output);
//        }
//        return outputs;
//    }
    //public abstract String parseToCode(Map<Integer, GeneralNode> nodes);

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

    public ArrayList<Integer> getInputs() {
        return inputs;
    }

    public void setInputs(ArrayList<Integer> inputs) {
        this.inputs = inputs;
    }

    public ArrayList<Integer> getOutput() {
        return output;
    }

    public void setOutput(ArrayList<Integer> output) {
        this.output = output;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
