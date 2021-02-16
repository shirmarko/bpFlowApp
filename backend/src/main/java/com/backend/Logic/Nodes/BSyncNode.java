package com.example.backend.Logic.Nodes;

import com.example.backend.Logic.Input;
import com.example.backend.Logic.Output;

import java.util.List;

public class BSyncNode extends Node {

    public BSyncNode(int id, Data data, List<Input> inputs, Output outputs, String type) {
        super(id, data, inputs, outputs, type);
    }

    @Override
    public String parseToCode() {
        return null;
    }
}
