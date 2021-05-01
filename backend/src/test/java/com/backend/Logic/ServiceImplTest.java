package com.backend.Logic;

import com.backend.Communication.BackendApplication;
import com.backend.Communication.Controller;
import com.backend.Models.DataModel;
import com.backend.Models.GraphModel;
import com.backend.Models.NodeModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import junit.framework.TestCase;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.util.JsonPathExpectationsHelper;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;


@RunWith(SpringRunner.class)
@WebMvcTest(Controller.class)

public class ServiceImplTest extends TestCase {

   // private ServiceImpl service = new ServiceImpl();

    public void setUp() throws Exception {
        super.setUp();
    }

    public void tearDown() throws Exception {
    }

    private NodeModel generateStartNode(String id, ArrayList<String> outputIDs){
        DataModel data = new DataModel(true, "","","", "", "");
        return new NodeModel(id, data, new ArrayList<>(), outputIDs, "Start");
    }

    private NodeModel generateGeneralNode(String id,String code, ArrayList<String> inputIDs, ArrayList<String> outputIDs) {
        DataModel data = new DataModel(true, "","","", "", code);
        return new NodeModel(id, data, inputIDs, outputIDs, "General");
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServiceImpl service;

    @Test
    public void testRunHelloWorld() throws Exception{
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
        //service.run(model, sseEmitter);

        MvcResult emmiter = mockMvc.perform(get("/subscribe"))
                .andExpect(request().asyncStarted())
                .andDo(MockMvcResultHandlers.log())
                .andReturn();

        mockMvc.perform(asyncDispatch(emmiter))
                .andDo(MockMvcResultHandlers.log())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

//        mockMvc.perform(post("/run")
//                        .content(asJsonString(model))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk());


        String event = emmiter.getResponse().getContentAsString();
        System.out.println(event);

        //new JsonPathExpectationsHelper("$.id").assertValue(event, "1");
        //new JsonPathExpectationsHelper("$.name").assertValue(event, "data");

    }

    public String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void foo()
    {

    }

    public void testDebug() {


    }
}