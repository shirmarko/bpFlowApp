package com.backend.Logic.Nodes;

import com.backend.Logic.Input;
import com.backend.Logic.Output;
import com.backend.Models.DataModel;
import com.backend.Models.NodeModel;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class StartNode extends Node {
    private StartNode(int id, Data data, List<Input> inputs, Output output, String type) {
        super(id, data, inputs, output, type);
    }

    public static StartNode Create(NodeModel model){
        StartData data = StartData.Create(model.getData());
        Output output = CreateOutput(model.getOutputs());
        return new StartNode(Integer.parseInt(model.getId()), data, new LinkedList<>(), output, model.getName());
    }

    @Override
    public String parseToCode(Map<Integer, Node> nodes) {
        StringBuilder body = new StringBuilder();
        Node cur = this;
        while ((cur = getNextNode(nodes, cur)) != null){
            body.append(cur.parseToCode(nodes));
        }
        String name = ((StartData)this.getData()).getName();
        if(name == null || name.equals("")){
            return String.format("bp.registerBThread(function(){\n%s } );\n", body.toString());
        }
        else{
            return String.format("bp.registerBThread(%s, function(){\n%s } );\n", name, body.toString());
        }
    }

    private Node getNextNode(Map<Integer, Node> nodes, Node cur) {
        return cur.getOutput() != null ? nodes.get(cur.getOutput().getNodeID()): null;
    }
}
