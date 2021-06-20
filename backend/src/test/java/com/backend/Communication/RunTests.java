package com.backend.Communication;

import com.backend.Logic.ServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.After;
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
import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@WebMvcTest(Controller.class)
public class RunTests {


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
    public void runEmptyGraph() throws Exception {
        runTest("EmptyGraph/EmptyGraphInputTest.json", TestsExpectedEvents.emptyGraphBpEventExpectedResult);
    }

    @Test
    public void runOnlyBsyncGraph() throws Exception {
        runTest("OnlyBsyncGraph/OnlyBsyncGraphInputTest.json", TestsExpectedEvents.onlyBsyncGraphBpEventsExpectedResult);
    }

    @Test
    public void runOnlyGeneralGraph() throws Exception {
        runTest("OnlyGeneralGraph/OnlyGeneralGraphInputTest.json", TestsExpectedEvents.onlyGeneralGraphBpEventsExpectedResult);
    }

    @Test
    public void runOnlyStartGraph() throws Exception {
        runTest("OnlyStartGraph/OnlyStartGraphInputTest.json", TestsExpectedEvents.onlyStartGraphBpEventsExpectedResult);
    }

    @Test
    public void runSimpleMixedGraph() throws Exception {
        runTest("SimpleMixedGraph/SimpleMixedGraphInputTest.json", TestsExpectedEvents.simpleMixedGraphBpEventsExpectedResult);
    }

    @Test
    public void runUnconnectedGraph1() throws Exception {
        runTest("UnconnectedGraph1/UnconnectedGraph1InputTest.json", TestsExpectedEvents.unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void runUnconnectedGraph2() throws Exception {
        runTest("UnconnectedGraph2/UnconnectedGraph2InputTest.json", TestsExpectedEvents.unconnectedGraphBpEventsExpectedResult);
    }

    @Test
    public void runHelloWorld() throws Exception {
        runTest("HelloWorld/HelloWorldInputTest.json", TestsExpectedEvents.helloWorldBpEventsExpectedResult);
    }

    @Test
    public void runHotCold() throws Exception {
        runTest("HotCold/HotColdInputTest.json", TestsExpectedEvents.hotCold3BpEventsExpectedResult);
    }

    @Test
    public void runGenericHotCold0() throws Exception {
        runTest("GenericHotCold0/GenericHotCold0InputTest.json", TestsExpectedEvents.hotCold0BpEventsExpectedResult);
    }

    @Test
    public void runGenericHotCold3() throws Exception {
        runTest("GenericHotCold3/GenericHotCold3InputTest.json", TestsExpectedEvents.hotCold3BpEventsExpectedResult);
    }

    @Test
    public void runGenericHotCold5() throws Exception {
        runTest("GenericHotCold5/GenericHotCold5InputTest.json", TestsExpectedEvents.hotCold5BpEventsExpectedResult);
    }

    private void runTest(String jsonFileName, String[] expectedEvents) throws Exception {
        String model = new String(Files.readAllBytes(Paths.get("src\\test\\TestResources\\" + jsonFileName)));

        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        String event = emmiter.getResponse().getContentAsString();
        final String prefix = "event:init\ndata:";
        String id = event.substring(prefix.length(), event.length()-2);

        model = model.replace("ReplaceID", id);
        mockMvc.perform(post("/run")
                .content(model)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        event = emmiter.getResponse().getContentAsString();
        String [] events = event.split("data:");
        //first event is init
        assertTrue(events.length > 1);
        for (int i = 2; i < events.length; i++){
            String eventData = events[i].split("\\n")[0];
            assertEquals(expectedEvents[i-2], eventData);
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
