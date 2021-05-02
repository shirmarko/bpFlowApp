package com.backend.Communication;

import com.backend.Logic.ServiceImpl;
import com.backend.Models.DataModel;
import com.backend.Models.GraphModel;
import com.backend.Models.NodeModel;
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
import org.springframework.test.util.JsonPathExpectationsHelper;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;
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

    private NodeModel generateStartNode(String id, ArrayList<String> outputIDs){
        DataModel data = new DataModel("", "");
        return new NodeModel(id, data, new ArrayList<>(), outputIDs, "Start");
    }

    private NodeModel generateGeneralNode(String id,String code, ArrayList<String> inputIDs, ArrayList<String> outputIDs) {
        DataModel data = new DataModel("", code);
        return new NodeModel(id, data, inputIDs, outputIDs, "General");
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceImpl service;

    @Test
    public void runHelloWorldSuccess() throws Exception {
        //SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        Map<String, NodeModel> nodes = new HashMap<>();

        NodeModel startNode1 = generateStartNode("1", new ArrayList<String>() {{ add("2"); }});
        NodeModel helloNode = generateGeneralNode("2", "bp.sync( {request:bp.Event(\"Hello,\")} );", new ArrayList<String>() {{ add("1"); }} ,new ArrayList<String>(){});

        NodeModel startNode2 = generateStartNode("3", new ArrayList<String>() {{ add("4"); }});
        NodeModel worldNode = generateGeneralNode("4", "bp.sync( {request:bp.Event(\"World!\")} );", new ArrayList<String>() {{ add("3"); }} ,new ArrayList<String>(){});

        NodeModel startNode3 = generateStartNode("5", new ArrayList<String>() {{ add("6"); }});
        NodeModel arbiterNode = generateGeneralNode("6", "bp.sync( {waitFor:bp.Event(\"Hello,\"), block:bp.Event(\"World!\")} );", new ArrayList<String>() {{ add("5"); }} ,new ArrayList<String>(){});

        nodes.put("1", startNode1);
        nodes.put("2", helloNode);
        nodes.put("3", startNode2);
        nodes.put("4", worldNode);
        nodes.put("5", startNode3);
        nodes.put("6", arbiterNode);
        GraphModel model = new GraphModel("1", nodes);

        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        System.out.println(asJsonString(model));

        mockMvc.perform(post("/run")
                        .content(asJsonString(model))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        String [] events = event.split("data:");
        String[] expectedEvents = new String[]{"init", "Hello,", "World!"};
        //first event is init
        for (int i = 1; i < events.length; i++){
            String eventData = events[i].split("\\n")[0];
            assertEquals(expectedEvents[i], eventData);
        }

    }

    @Test
    public void runHotColdSuccess() throws Exception {
        //SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        Map<String, NodeModel> nodes = new HashMap<>();

        NodeModel startNode1 = generateStartNode("1", new ArrayList<String>() {{ add("2"); }});
        NodeModel hotNode1 = generateGeneralNode("2", "bp.sync( {request:bp.Event(\"Hot\")} );", new ArrayList<String>() {{ add("1"); }} ,new ArrayList<String>(){{ add("3"); }});
        NodeModel hotNode2 = generateGeneralNode("3", "bp.sync( {request:bp.Event(\"Hot\")} );", new ArrayList<String>() {{ add("2"); }} ,new ArrayList<String>(){{ add("4"); }});
        NodeModel hotNode3 = generateGeneralNode("4", "bp.sync( {request:bp.Event(\"Hot\")} );", new ArrayList<String>() {{ add("3"); }} ,new ArrayList<String>() {});

        NodeModel startNode2 = generateStartNode("5", new ArrayList<String>() {{ add("6"); }});
        NodeModel coldNode1 = generateGeneralNode("6", "bp.sync( {request:bp.Event(\"Cold\")} );", new ArrayList<String>() {{ add("5"); }} ,new ArrayList<String>(){{ add("7"); }});
        NodeModel coldNode2 = generateGeneralNode("7", "bp.sync( {request:bp.Event(\"Cold\")} );", new ArrayList<String>() {{ add("6"); }} ,new ArrayList<String>(){{ add("8"); }});
        NodeModel coldNode3 = generateGeneralNode("8", "bp.sync( {request:bp.Event(\"Cold\")} );", new ArrayList<String>() {{ add("7"); }} ,new ArrayList<String>() {});

        NodeModel startNode3 = generateStartNode("9", new ArrayList<String>() {{ add("10"); }});
        NodeModel blockCold = generateGeneralNode("10", "bp.sync( {waitFor:bp.Event(\"Hot\"), block:bp.Event(\"Cold\")} );", new ArrayList<String>() {{ add("9"); }} ,new ArrayList<String>(){{ add("11"); }});
        NodeModel blockHot = generateGeneralNode("11", "bp.sync( {waitFor:bp.Event(\"Cold\"), block:bp.Event(\"Hot\")} );", new ArrayList<String>() {{ add("10"); }} ,new ArrayList<String>(){{ add("10"); }});

        nodes.put("1", startNode1);
        nodes.put("2", hotNode1);
        nodes.put("3", hotNode2);
        nodes.put("4", hotNode3);
        nodes.put("5", startNode2);
        nodes.put("6", coldNode1);
        nodes.put("7", coldNode2);
        nodes.put("8", coldNode3);
        nodes.put("9", startNode3);
        nodes.put("10", blockCold);
        nodes.put("11", blockHot);
        GraphModel model = new GraphModel("1", nodes);

        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        mockMvc.perform(post("/run")
                .content(asJsonString(model))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        System.out.println(event);
        String [] events = event.split("data:");
        String[] expectedEvents = new String[]{"init", "Hot", "Cold", "Hot", "Cold", "Hot", "Cold"};
        //first event is init
        for (int i = 1; i < events.length; i++){
            String eventData = events[i].split("\\n")[0];
            assertEquals(expectedEvents[i], eventData);
        }
    }

    @Test
    public void runEmptySuccess() throws Exception {


        Map<String, NodeModel> nodes = new HashMap<>();

        NodeModel startNode1 = generateStartNode("1", new ArrayList<String>() {{ add("2"); }});
        NodeModel helloNode = generateGeneralNode("2", "bp.sync( {request:bp.Event(\"Hello,\")} );", new ArrayList<String>() {{ add("1"); }} ,new ArrayList<String>(){});

        nodes.put("1", startNode1);
        nodes.put("2", helloNode);

        GraphModel model = new GraphModel("a53df309-d483-473b-a3c9-79b027ee4cea@0.1.0", nodes);

        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        System.out.println(asJsonString(model));

        mockMvc.perform(post("/run")
                .content(asJsonString(model))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        String [] events = event.split("data:");
        String[] expectedEvents = new String[]{"init", "Hello,"};
        //first event is init
        for (int i = 1; i < events.length; i++){
            String eventData = events[i].split("\\n")[0];
            assertEquals(expectedEvents[i], eventData);
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