package ma.map.tm;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import ma.map.tm.business.ProjectService;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.ProjectDTO;
import ma.map.tm.web.ProjectController;

@RunWith(SpringRunner.class)
@WebMvcTest(ProjectController.class)
public class ProjectControllerTests {

	@Autowired
    private MockMvc mvc;
 
    @MockBean
    private ProjectService service;
    
    /** 
     * GET /projects 
     */
    @Test
    public void whenGetProjects_thenReturnJsonArray() throws Exception {
        
    	// given 2 projects
        Project p0 = new Project("P0", "Desc0", new Date()),
        		p1 = new Project("P1", "Desc1", new Date());
        
        // mock Service
        List<ProjectDTO> allProjects = Arrays
        		.asList(ProjectDTO.convert(p0), ProjectDTO.convert(p1));
        when(service.retrieveAllProjects()).thenReturn(allProjects);
     
        // should retrieve an array of 2 projects
        mvc.perform(get("/projects")
          .contentType(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk()) // 200 OK
          .andExpect(jsonPath("$", hasSize(2))) // size == 2
          .andExpect(jsonPath("$[0].title", is(p0.getTitle()))) // 1st Project OK
          .andExpect(jsonPath("$[1].description", is(p1.getDescription()))); // 2nd Project OK
    }
    
    /**
     * GET /projects/1
     */
    @Test
    public void whenShowProject_thenReturnJsonObject() throws Exception {
    	
    	// given 1 project
    	int idProject = 1000;
        Project p0 = new Project("P0", "Desc0", new Date());
        p0.setIdProject((long)idProject);
        
        // mock Service
        when(service.retrieveProjectById(p0.getIdProject())).thenReturn(ProjectDTO.convert(p0));
     
        // should retrieve the project with id = 1000
        mvc.perform(get("/projects/" + idProject)
          .contentType(MediaType.APPLICATION_JSON))
          .andExpect(status().isOk()) // 200 OK
          .andExpect(jsonPath("$.idProject", is(idProject)))
          .andExpect(jsonPath("$.title", is(p0.getTitle())))
          .andExpect(jsonPath("$.description", is(p0.getDescription())));
    }
    

}
