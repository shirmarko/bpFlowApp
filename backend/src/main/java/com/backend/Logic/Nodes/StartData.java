package com.backend.Logic.Nodes;

import com.backend.Models.DataModel;

public class StartData extends Data {

    private String name;

    private StartData(String name) {
        this.name = name;
    }

    public static StartData Create(DataModel data) {
        return new StartData(data.getName());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
