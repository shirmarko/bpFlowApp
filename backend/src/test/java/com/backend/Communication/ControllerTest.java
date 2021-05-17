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
import java.util.Arrays;

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

//    private NodeModel generateStartNode(String id, ArrayList<String> outputIDs){
//        DataModel data = new DataModel("", "let outputs = {};\n outputs[\"output\"] = payload;\n return outputs;");
//        Map<String, ArrayList<String>> outputs = new HashMap<String, ArrayList<String>>() {{
//            put("output", outputIDs); }};
//        return new NodeModel(id, data, new ArrayList<>(), outputs, "Start");
//    }
//
//    private NodeModel generateGeneralNode(String id,String code, ArrayList<String> inputIDs, Map<String, ArrayList<String>> outputIDs) {
//        DataModel data = new DataModel("", code);
//        return new NodeModel(id, data, inputIDs, outputIDs, "General");
//    }
//
//    private NodeModel generateBsyncNode(String id, ArrayList<String> outputIDs, String request, String waitFor, String block){
//        StringBuilder code = new StringBuilder();
//        code.append("bp.sync( {waitFor:bp.Event(\"Hello,\"), block:bp.Event(\"World!\")} );\n return {};");
//        code.append("bp.sync( {");
//        List<String> bpsyncBody = new ArrayList<>();
//        if(request != null){
//            bpsyncBody.add("request:bp.Event(" + request + ")");
//        }
//        if(waitFor != null){
//            bpsyncBody.add("waitFor:bp.Event(" + waitFor + ")");
//        }
//        if(block != null){
//            bpsyncBody.add("block:bp.Event(" + block + ")");
//        }
//        code.append(StringUtils.join(bpsyncBody, ','));
//        code.append("} );\n");
//        code.append("let outputs = {};\n outputs[\"output\"] = payload;\n return outputs;");
//        DataModel data = new DataModel("", "let outputs = {};\n outputs[\"output\"] = payload;\n return outputs;");
//        Map<String, ArrayList<String>> outputs = new HashMap<String, ArrayList<String>>() {{
//            put("output", outputIDs); }};
//        return new NodeModel(id, data, new ArrayList<>(), outputs, "Start");
//    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceImpl service;

//    @Test
//    public void runHelloWorldSuccess() throws Exception {
//        //SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//        Map<String, NodeModel> nodes = new HashMap<>();
//
//        NodeModel startNode1 = generateStartNode("1", new ArrayList<String>() {{ add("2"); }});
//        NodeModel helloNode = generateGeneralNode("2", "bp.sync( {request:bp.Event(\"Hello,\")} );\n return {};", new ArrayList<String>() {{ add("1"); }} , new HashMap<>());
//
//        NodeModel startNode2 = generateStartNode("3", new ArrayList<String>() {{ add("4"); }});
//        NodeModel worldNode = generateGeneralNode("4", "bp.sync( {request:bp.Event(\"World!\")} );\n return {};", new ArrayList<String>() {{ add("3"); }} ,new HashMap<>());
//
//        NodeModel startNode3 = generateStartNode("5", new ArrayList<String>() {{ add("6"); }});
//        NodeModel arbiterNode = generateGeneralNode("6", "bp.sync( {waitFor:bp.Event(\"Hello,\"), block:bp.Event(\"World!\")} );\n return {};", new ArrayList<String>() {{ add("5"); }} ,new HashMap<>());
//
//        nodes.put("1", startNode1);
//        nodes.put("2", helloNode);
//        nodes.put("3", startNode2);
//        nodes.put("4", worldNode);
//        nodes.put("5", startNode3);
//        nodes.put("6", arbiterNode);
//        GraphModel model = new GraphModel("1", nodes);
//
//        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
//                .andExpect(request().asyncStarted())
//                .andDo(MockMvcResultHandlers.log())
//                .andReturn();
//
//        //System.out.println(asJsonString(model));
//
//        mockMvc.perform(post("/run")
//                        .content(asJsonString(model))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk());
//
//
//        String event = emmiter.getResponse().getContentAsString();
//        String [] events = event.split("data:");
//        String[] expectedEvents = new String[]{"init", "Hello,", "World!"};
//        assertTrue(events.length > 1);
//        //first event is init
//        for (int i = 1; i < events.length; i++){
//            String eventData = events[i].split("\\n")[0];
//            assertEquals(expectedEvents[i], eventData);
//        }
//
//    }

    @Test
    public void runHotCold() throws Exception {
        runTest("HotCold.json", new String[]{"Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Program execution ended."});
    }

    @Test
    public void runHelloWorld() throws Exception {
        runTest("HelloWorld.json", new String[]{"Hello", "World", "Program execution ended."});
    }

    @Test
    public void runGenericHotCold3() throws Exception {
        runTest("GenericHotCold3.json", new String[]{ "Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Program execution ended."});
    }

    @Test
    public void runGenericHotCold5() throws Exception {
        runTest("GenericHotCold5.json", new String[]{"Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Hot", "Cold", "Program execution ended."});
    }

    @Test
    public void runGenericHotCold0() throws Exception {
        runTest("GenericHotCold0.json", new String[]{"Program execution ended."});
    }

    @Test
    public void debugHelloWorld() throws Exception {
        MvcResult emmiter = debugTest("HelloWorld.json");
        stepTest("HelloWorld", new String []{}, emmiter);
        stepTest("HelloWorld", new String []{}, emmiter);
        stepTest("HelloWorld", new String []{}, emmiter);
        stepTest("HelloWorld", new String []{}, emmiter);

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


        String event = emmiter.getResponse().getContentAsString();
        //first event is init
        System.out.println("debug event: " + event);
        return emmiter;
    }

    private void stepTest(String graphId, String[] expectedEvents, MvcResult emmiter) throws Exception {

        mockMvc.perform(post("/step")
                .content(graphId)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        String [] events = event.split("data:");
        //first event is init
        System.out.println(event);
//        System.out.println(Arrays.toString(events));
//        assertTrue(events.length > 1);
//        for (int i = 1; i < events.length; i++){
//            String eventData = events[i].split("\\n")[0];
//            assertEquals(expectedEvents[i-1], eventData);
//        }
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
        System.out.println(event);
        System.out.println(Arrays.toString(events));
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