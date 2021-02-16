package com.backend.Logic.Nodes;

import com.backend.Logic.Input;
import com.backend.Logic.Output;
import com.backend.Models.NodeModel;

import java.util.*;

public class BSyncNode extends Node {

    private BSyncNode(int id, Data data, List<Input> inputs, Output output, String type) {
        super(id, data, inputs, output, type);
    }

    public static BSyncNode Create(NodeModel model){
        BSyncData data = BSyncData.Create(model.getData());

        List<Input> inputs = CreateInputs(model.getInputs());
        Output output = CreateOutput(model.getOutputs());
        return new BSyncNode(Integer.parseInt(model.getId()), data, inputs, output, model.getName());
    }

    @Override
    public String parseToCode(Map<Integer, Node> nodes) {
        StringBuilder code = new StringBuilder();
        BSyncData data = (BSyncData)this.getData();
        code.append("\tbp.sync( {");
        String prefix = "";
        if(!data.getRequest().equals("")){
            code.append(String.format("request:bp.Event(\"%s\")", data.getRequest()));
            prefix = ", ";
        }
        if(!data.getWaitFor().equals("")){
            code.append(prefix).append(String.format("waitFor:bp.Event(\"%s\")", data.getWaitFor()));
            prefix = ", ";
        }
        if(!data.getBlock().equals("")){
            code.append(prefix).append(String.format("block:bp.Event(\"%s\")", data.getBlock()));
        }

        code.append("} );\n");
        return code.toString();
    }
}
