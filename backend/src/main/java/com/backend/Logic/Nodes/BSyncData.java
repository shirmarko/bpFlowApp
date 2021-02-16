package com.backend.Logic.Nodes;

import com.backend.Models.DataModel;

public class BSyncData extends Data {

    private String request;
    private String waitFor;
    private String block;

    private BSyncData(String request, String waitFor, String block) {
        this.request = request;
        this.waitFor = waitFor;
        this.block = block;
    }

    public static BSyncData Create(DataModel data) {
        return new BSyncData(data.getRequest(), data.getWait(), data.getBlock());
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getWaitFor() {
        return waitFor;
    }

    public void setWaitFor(String waitFor) {
        this.waitFor = waitFor;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }
}
