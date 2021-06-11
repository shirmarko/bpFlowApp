package com.backend.Communication;

import com.backend.Logic.ServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import il.ac.bgu.cs.bp.bpjs.internal.Pair;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(Controller.class)
public class ControllerTest {

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceImpl service;

    private final String[] emptyGraphBpEventExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    private final String[] onlyBsyncGraphBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"a\"}", "{\"data\":null,\"name\":\"b\"}", "{\"data\":null,\"name\":\"c\"}", "{\"data\":null,\"name\":\"d\"}", "{\"name\":\"Program execution ended.\"}"};
    private final String[] onlyGeneralGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    private final String[] onlyStartGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    private final String[] simpleMixedGraphBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"a\"}", "{\"data\":null,\"name\":\"b\"}", "{\"name\":\"Program execution ended.\"}"};
    private final String[] unconnectedGraphBpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    private final String[] helloWorldBpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hello\"}", "{\"data\":null,\"name\":\"World\"}", "{\"name\":\"Program execution ended.\"}"};
    private final String[] hotCold0BpEventsExpectedResult = new String[]{"{\"name\":\"Program execution ended.\"}"};
    private final String[] hotCold3BpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"name\":\"Program execution ended.\"}"};
    private final String[] hotCold5BpEventsExpectedResult = new String[]{"{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"data\":null,\"name\":\"Hot\"}", "{\"data\":null,\"name\":\"Cold\"}", "{\"name\":\"Program execution ended.\"}"};


    @Test
    public void runEmptyGraph() throws Exception {
        runTest("EmptyGraph/EmptyGraphInputTest.json", emptyGraphBpEventExpectedResult);
    }

    @Test
    public void debugEmptyGraph() throws Exception {
        MvcResult emmiter = debugTest("EmptyGraph/EmptyGraphInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("Empty", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(emptyGraphBpEventExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < stepEvents.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < selectedEventsEvents.size(); i++){
            Assert.assertEquals(expectedselectedEventsEventsData.get(i).replaceAll("\\s+",""), selectedEventsEvents.get(i));
        }

    }

    @Test
    public void runOnlyBsyncGraph() throws Exception {
        runTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json", onlyBsyncGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyBsyncGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("OnlyBsync", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(onlyBsyncGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep5.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for (int i = 0; i < expectedStepEventsData.size(); i++) {
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+", ""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedSelectedEventsData = new ArrayList<>();
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep1SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep2SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep3SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep4SelectedEvents.json"))));

        System.out.println();
        Assert.assertEquals(expectedSelectedEventsData.size(), selectedEventsEvents.size());
        for (int i = 0; i < expectedSelectedEventsData.size(); i++) {
            AssertSelectedEvents(expectedSelectedEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runOnlyGeneralGraph() throws Exception {
        runTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json", onlyGeneralGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyGeneralGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("OnlyGeneralGraph", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(onlyGeneralGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsData = new ArrayList<>();

        Assert.assertEquals(expectedselectedEventsData.size(), selectedEvents.size());
        for(int i = 0; i < expectedselectedEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsData.get(i), selectedEvents.get(i));
        }
    }

    @Test
    public void runOnlyStartGraph() throws Exception {
        runTest("OnlyStartGraph/OnlyStartGraphInputTest.json", onlyStartGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyStartGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyStartGraph/OnlyStartGraphInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("OnlyStartGraph", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(onlyStartGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runSimpleMixedGraph() throws Exception {
        runTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json", simpleMixedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugSimpleMixedGraph() throws Exception {
        MvcResult emmiter = debugTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("SimpleMixed", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(simpleMixedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep3.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep2expectedselectedEventsEventsData.json"))));

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runUnconnectedGraph1() throws Exception {
        runTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json", unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugUnconnectedGraph1() throws Exception {
        MvcResult emmiter = debugTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json");
        Map<String, ArrayList<String>> events = stepTest("UnconnectedGraph1", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(unconnectedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runUnconnectedGraph2() throws Exception {
        runTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json", unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugUnconnectedGraph2() throws Exception {
        MvcResult emmiter = debugTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json");
        Map<String, ArrayList<String>> events = stepTest("UnconnectedGraph2", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(unconnectedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();

        Assert.assertEquals(expectedselectedEventsEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runHelloWorld() throws Exception {
        runTest("HelloWorld/HelloWorldInputTest.json", helloWorldBpEventsExpectedResult);
    }

    @Test
    public void debugHelloWorld() throws Exception {
        MvcResult emmiter = debugTest("HelloWorld/HelloWorldInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("HelloWorld", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(helloWorldBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep3.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep1SelectedEvents.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep2SelectedEvents.json"))));

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runHotCold() throws Exception {
        runTest("HotCold/HotColdInputTest.json", hotCold3BpEventsExpectedResult);
    }

    @Test
    public void debugHotCold() throws Exception {
        MvcResult emmiter = debugTest("HotCold/HotColdInputTest.json");
        Map<String, ArrayList<String>> events = stepTest("HotCold", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(hotCold3BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep5.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep6.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep7.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep2expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep3expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep4expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep5expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep6expectedselectedEventsEventsData.json"))));

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runGenericHotCold0() throws Exception {
        runTest("GenericHotCold0/GenericHotCold0InputTest.json", hotCold0BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold0() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold0/GenericHotCold0InputTest.json");
        Map<String, ArrayList<String>> events = stepTest("GenericHotCold0", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(hotCold0BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold0\\GenericHotCold0DebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();

        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    @Test
    public void runGenericHotCold3() throws Exception {
        runTest("GenericHotCold3/GenericHotCold3InputTest.json", hotCold3BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold3() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold3/GenericHotCold3InputTest.json");
        Map<String, ArrayList<String>> events = stepTest("GenericHotCold3", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(hotCold3BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep5.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep6.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep7.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }


        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep2expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep3expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep4expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep5expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep6expectedselectedEventsEventsData.json"))));


        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }

    }

    @Test
    public void runGenericHotCold5() throws Exception {
        runTest("GenericHotCold5/GenericHotCold5InputTest.json", hotCold5BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold5() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold5/GenericHotCold5InputTest.json");
        Map<String, ArrayList<String>> events = stepTest("GenericHotCold5", emmiter);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(hotCold5BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep5.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep6.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep7.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep8.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep9.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep10.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep11.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep2expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep3expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep4expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep5expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep6expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep7expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep8expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep9expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold5\\GenericHotCold5DebugStep10expectedselectedEventsEventsData.json"))));


        Assert.assertEquals(expectedselectedEventsEventsData.size(), selectedEventsEvents.size());
        for(int i = 0; i < expectedselectedEventsEventsData.size(); i++){
            AssertSelectedEvents(expectedselectedEventsEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    private MvcResult debugTest(String jsonFileName) throws Exception {
        String model = new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\" + jsonFileName)));
        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        mockMvc.perform(post("/debug")
                .content(model)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        return emmiter;
    }

    private Map<String, ArrayList<String>> stepTest(String graphId, MvcResult emmiter) throws Exception {

        String events;
        do{
            mockMvc.perform(post("/step")
                    .content(graphId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());

            events = emmiter.getResponse().getContentAsString();
        }
        while(!events.contains("{\"isDone\":true}"));

        System.out.println(events);
        Map<String, ArrayList<String>> output = new HashMap<>();
        output.put("bpEvents", getEventsData(events, "flowEvent"));
        output.put("stepEvents", getEventsData(events, "step"));
        output.put("selectedEventsEvents", getEventsData(events, "selectedEvents"));
        return output;
    }

    private ArrayList<String> getEventsData(String events, String eventType) {
        ArrayList<String> eventsData = new ArrayList<>();
        String[] eventsSplitted = events.split(eventType);
        final String data = "data:";
        for(int i = 1; i < eventsSplitted.length; i++){
            if(eventsSplitted[i].contains("event:")){
                String curDataEvent = eventsSplitted[i].substring(eventsSplitted[i].indexOf(data) + data.length(), eventsSplitted[i].indexOf("event:"));
                curDataEvent = curDataEvent.substring(0, curDataEvent.length() - 2);
                eventsData.add(curDataEvent);
            }
        }
        return eventsData;
    }

    private void runTest(String jsonFileName, String[] expectedEvents) throws Exception {
        String model = new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\" + jsonFileName)));
        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        mockMvc.perform(post("/run")
                .content(model)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        String [] events = event.split("data:");
        //first event is init
        assertTrue(events.length > 1);
        for (int i = 1; i < events.length; i++){
            String eventData = events[i].split("\\n")[0];
            assertEquals(expectedEvents[i-1], eventData);
        }
    }

    public String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void AssertSelectedEvents(String expectedSelectedEventList, String actualSelectedEventList) {
        expectedSelectedEventList = expectedSelectedEventList.substring(1, expectedSelectedEventList.length()-1);
        actualSelectedEventList = actualSelectedEventList.substring(1, actualSelectedEventList.length()-1);

        String [] expected =  expectedSelectedEventList.split(",");
        String [] actual =  actualSelectedEventList.split(",");
        Assert.assertEquals(expected.length, actual.length);
        Assert.assertTrue(Arrays.asList(expected).containsAll(Arrays.asList(actual)));
    }
}