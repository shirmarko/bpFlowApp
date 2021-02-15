package com.example.backend;


public class Data {

    private boolean isBasic;
    private String request;
    private String wait;
    private String block;

    public Data(boolean isBasic, String request, String wait, String block) {
        this.isBasic = isBasic;
        this.request = request;
        this.wait = wait;
        this.block = block;
    }

    public boolean isBasic() {
        return isBasic;
    }

    public void setBasic(boolean basic) {
        isBasic = basic;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getWait() {
        return wait;
    }

    public void setWait(String wait) {
        this.wait = wait;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    @Override
    public String toString() {
        return "Data{" +
                "isBasic:" + isBasic +
                ", request:'" + request + '\'' +
                ", wait:'" + wait + '\'' +
                ", block:'" + block + '\'' +
                '}';
    }
}
