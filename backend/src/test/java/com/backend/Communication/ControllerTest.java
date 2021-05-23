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

    private final String[] emptyGraphBpEventExpectedResult = new String[]{"Program execution ended."};
    private final String[] onlyBsyncGraphBpEventsExpectedResult = new String[]{"a", "b", "c", "d", "Program execution ended."};
    private final String[] onlyGeneralGraphBpEventsExpectedResult = new String[]{"Program execution ended."};
    private final String[] onlyStartGraphBpEventsExpectedResult = new String[]{"Program execution ended."};
    private final String[] simpleMixedGraphBpEventsExpectedResult = new String[]{"a", "b", "Program execution ended."};
    private final String[] unconnectedGraphBpEventsExpectedResult = new String[]{"Program execution ended."};
    private final String[] helloWorldBpEventsExpectedResult = new String[]{"Hello", "World", "Program execution ended."};
    private final String[] hotCold0BpEventsExpectedResult = new String[]{"Program execution ended."};
    private final String[] hotCold3BpEventsExpectedResult = new String[]{"Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Program execution ended."};
    private final String[] hotCold5BpEventsExpectedResult = new String[]{"Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Program execution ended."};


    @Test
    public void runEmptyGraph() throws Exception {
        runTest("EmptyGraph/EmptyGraphInputTest.json", emptyGraphBpEventExpectedResult);
    }

    @Test
    public void debugEmptyGraph() throws Exception {
        MvcResult emmiter = debugTest("EmptyGraph/EmptyGraphInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("Empty", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(emptyGraphBpEventExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\EmptyGraph\\EmptyGraphDebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runOnlyBsyncGraph() throws Exception {
        runTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json", onlyBsyncGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyBsyncGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("OnlyBsync", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(onlyBsyncGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
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
    }

    @Test
    public void runOnlyGeneralGraph() throws Exception {
        runTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json", onlyGeneralGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyGeneralGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("OnlyGeneralGraph", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(onlyGeneralGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyGeneralGraph\\OnlyGeneralGraphDebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runOnlyStartGraph() throws Exception {
        runTest("OnlyStartGraph/OnlyStartGraphInputTest.json", onlyStartGraphBpEventsExpectedResult);
    }

    @Test
    public void debugOnlyStartGraph() throws Exception {
        MvcResult emmiter = debugTest("OnlyStartGraph/OnlyStartGraphInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("OnlyStartGraph", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(onlyStartGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyStartGraph\\OnlyStartGraphDebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runSimpleMixedGraph() throws Exception {
        runTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json", simpleMixedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugSimpleMixedGraph() throws Exception {
        MvcResult emmiter = debugTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("SimpleMixed", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(simpleMixedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep3.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runUnconnectedGraph1() throws Exception {
        runTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json", unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugUnconnectedGraph1() throws Exception {
        MvcResult emmiter = debugTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("UnconnectedGraph1", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(unconnectedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\UnconnectedGraph1\\UnconnectedGraph1DebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runUnconnectedGraph2() throws Exception {
        runTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json", unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void debugUnconnectedGraph2() throws Exception {
        MvcResult emmiter = debugTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("UnconnectedGraph2", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(unconnectedGraphBpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\UnconnectedGraph2\\UnconnectedGraph2DebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runHelloWorld() throws Exception {
        runTest("HelloWorld/HelloWorldInputTest.json", helloWorldBpEventsExpectedResult);
    }

    @Test
    public void debugHelloWorld() throws Exception {
        MvcResult emmiter = debugTest("HelloWorld/HelloWorldInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("HelloWorld", emmiter);


        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(helloWorldBpEventsExpectedResult, bpEvents.toArray());


        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep3.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runHotCold() throws Exception {
        runTest("HotCold/HotColdInputTest.json", hotCold3BpEventsExpectedResult);
    }

    @Test
    public void debugHotCold() throws Exception {
        MvcResult emmiter = debugTest("HotCold/HotColdInputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("HotCold", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(hotCold3BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
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
    }

    @Test
    public void runGenericHotCold0() throws Exception {
        runTest("GenericHotCold0/GenericHotCold0InputTest.json", hotCold0BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold0() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold0/GenericHotCold0InputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("GenericHotCold0", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(hotCold0BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold0\\GenericHotCold0DebugStep1.json"))));

        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for(int i = 0; i < expectedStepEventsData.size(); i++){
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+",""), stepEvents.get(i));
        }
    }

    @Test
    public void runGenericHotCold3() throws Exception {
        runTest("GenericHotCold3/GenericHotCold3InputTest.json", hotCold3BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold3() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold3/GenericHotCold3InputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("GenericHotCold3", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(hotCold3BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
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
    }

    @Test
    public void runGenericHotCold5() throws Exception {
        runTest("GenericHotCold5/GenericHotCold5InputTest.json", hotCold5BpEventsExpectedResult);
    }

    @Test
    public void debugGenericHotCold5() throws Exception {
        MvcResult emmiter = debugTest("GenericHotCold5/GenericHotCold5InputTest.json");
        Pair<ArrayList<String>, ArrayList<String>> events = stepTest("GenericHotCold5", emmiter);

        ArrayList<String> bpEvents = events.getLeft();
        Assert.assertArrayEquals(hotCold5BpEventsExpectedResult, bpEvents.toArray());

        ArrayList<String> stepEvents = events.getRight();
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

    private Pair<ArrayList<String>, ArrayList<String>> stepTest(String graphId, MvcResult emmiter) throws Exception {

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
        ArrayList<String> bpEvents = getEventsData(events, "flowEvent");
        ArrayList<String> stepEvents = getEventsData(events, "step");
        return new Pair<>(bpEvents, stepEvents);
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
}