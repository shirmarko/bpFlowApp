package com.backend.Communication;

public class TestsExpectedEvents {

    protected static final String[] emptyGraphBpEventExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    protected static final String[] onlyBsyncGraphBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"a\"}", "{\"data\":null,\"name\":\"b\"}", "{\"data\":null,\"name\":\"c\"}", "{\"data\":null,\"name\":\"d\"}", "{\"name\":\"Program execution ended.\"}"};
    protected static final String[] onlyGeneralGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    protected static final String[] onlyStartGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    protected static final String[] simpleMixedGraphBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"a\"}", "{\"data\":null,\"name\":\"b\"}", "{\"name\":\"Program execution ended.\"}"};
    protected static final String[] unconnectedGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    protected static final String[] helloWorldBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hello\"}", "{\"data\":null,\"name\":\"World\"}", "{\"name\":\"Program execution ended.\"}"};
    protected static final String[] hotCold0BpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    protected static final String[] hotCold3BpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"name\":\"Program execution ended.\"}"};
    protected static final String[] hotCold5BpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"name\":\"Program execution ended.\"}"};
}
