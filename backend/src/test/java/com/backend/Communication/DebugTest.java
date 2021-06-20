package com.backend.Communication;

import com.backend.Logic.ServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(Controller.class)
public class DebugTest {


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

    @Test
    public void debugEmptyGraph() throws Exception {
        debugTest("EmptyGraph/EmptyGraphInputTest.json", TestsExpectedEvents.emptyGraphBpEventExpectedResult, new ArrayList<>(), new ArrayList<>());
    }

    @Test
    public void debugOnlyBsyncGraph() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep5.json"))));

        ArrayList<String> expectedSelectedEventsData = new ArrayList<>();
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep1SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep2SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep3SelectedEvents.json"))));
        expectedSelectedEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\OnlyBsyncGraph\\OnlyBsyncGraphDebugStep4SelectedEvents.json"))));

        debugTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json", TestsExpectedEvents.onlyBsyncGraphBpEventsExpectedResult, expectedStepEventsData, expectedSelectedEventsData);
    }

    @Test
    public void debugOnlyGeneralGraph() throws Exception {
        debugTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json", TestsExpectedEvents.onlyGeneralGraphBpEventsExpectedResult, new ArrayList<>(), new ArrayList<>());
    }

    @Test
    public void debugOnlyStartGraph() throws Exception {
        debugTest("OnlyStartGraph/OnlyStartGraphInputTest.json", TestsExpectedEvents.onlyStartGraphBpEventsExpectedResult, new ArrayList<>(), new ArrayList<>());
    }

    @Test
    public void debugSimpleMixedGraph() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep3.json"))));

        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\SimpleMixedGraph\\SimpleMixedGraphDebugStep2expectedselectedEventsEventsData.json"))));

        debugTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json", TestsExpectedEvents.simpleMixedGraphBpEventsExpectedResult, expectedStepEventsData, expectedselectedEventsEventsData);
    }

    @Test
    public void debugUnconnectedGraph1() throws Exception {
        debugTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json", TestsExpectedEvents.unconnectedGraphBpEventsExpectedResult, new ArrayList<>(), new ArrayList<>());
    }

    @Test
    public void debugUnconnectedGraph2() throws Exception {
        debugTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json", TestsExpectedEvents.unconnectedGraphBpEventsExpectedResult, new ArrayList<>(), new ArrayList<>());
    }

    @Test
    public void debugHelloWorld() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep3.json"))));

        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep1SelectedEvents.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HelloWorld\\HelloWorldDebugStep2SelectedEvents.json"))));

        debugTest("HelloWorld/HelloWorldInputTest.json", TestsExpectedEvents.helloWorldBpEventsExpectedResult, expectedStepEventsData, expectedselectedEventsEventsData);
    }

    @Test
    public void debugHotCold() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep5.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep6.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep7.json"))));

        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep2expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep3expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep4expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep5expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\HotCold\\HotColdDebugStep6expectedselectedEventsEventsData.json"))));

        debugTest("HotCold/HotColdInputTest.json", TestsExpectedEvents.hotCold3BpEventsExpectedResult, expectedStepEventsData, expectedselectedEventsEventsData);
    }

    @Test
    public void debugGenericHotCold0() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold0\\GenericHotCold0DebugStep1.json"))));

        debugTest("GenericHotCold0/GenericHotCold0InputTest.json", TestsExpectedEvents.hotCold0BpEventsExpectedResult, expectedStepEventsData, new ArrayList<>());
    }

    @Test
    public void debugGenericHotCold3() throws Exception {
        ArrayList<String> expectedStepEventsData = new ArrayList<>();
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep1.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep2.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep3.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep4.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep5.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep6.json"))));
        expectedStepEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep7.json"))));

        ArrayList<String> expectedselectedEventsEventsData = new ArrayList<>();
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep1expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep2expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep3expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep4expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep5expectedselectedEventsEventsData.json"))));
        expectedselectedEventsEventsData.add(new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\GenericHotCold3\\GenericHotCold3DebugStep6expectedselectedEventsEventsData.json"))));

        debugTest("GenericHotCold3/GenericHotCold3InputTest.json", TestsExpectedEvents.hotCold3BpEventsExpectedResult, expectedStepEventsData, expectedselectedEventsEventsData);
    }

    @Test
    public void debugGenericHotCold5() throws Exception {
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

        debugTest("GenericHotCold5/GenericHotCold5InputTest.json", TestsExpectedEvents.hotCold5BpEventsExpectedResult, expectedStepEventsData, expectedselectedEventsEventsData);
    }

    private void debugTest(String inputJsonPath, String [] expectedBPEvents, ArrayList<String> expectedStepEventsData, ArrayList<String> expectedSelectedEventsData) throws Exception{
        Map<String, ArrayList<String>> events = getDebugTestEvents(inputJsonPath);

        ArrayList<String> bpEvents = events.get("bpEvents");
        Assert.assertArrayEquals(expectedBPEvents, bpEvents.toArray());

        ArrayList<String> stepEvents = events.get("stepEvents");
        Assert.assertEquals(expectedStepEventsData.size(), stepEvents.size());
        for (int i = 0; i < expectedStepEventsData.size(); i++) {
            Assert.assertEquals(expectedStepEventsData.get(i).replaceAll("\\s+", ""), stepEvents.get(i));
        }

        ArrayList<String> selectedEventsEvents = events.get("selectedEventsEvents");
        Assert.assertEquals(expectedSelectedEventsData.size(), selectedEventsEvents.size());
        for (int i = 0; i < expectedSelectedEventsData.size(); i++) {
            AssertSelectedEvents(expectedSelectedEventsData.get(i), selectedEventsEvents.get(i));
        }
    }

    private Map<String, ArrayList<String>> getDebugTestEvents(String jsonFileName) throws Exception {
        String model = new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\" + jsonFileName)));
        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        String event = emmiter.getResponse().getContentAsString();
        final String prefix = "event:init\ndata:";
        String id = event.substring(prefix.length(), event.length()-2);

        model = model.replace("ReplaceID", id);

        mockMvc.perform(post("/debug")
                .content(model)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        return stepTest(id, emmiter);
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
