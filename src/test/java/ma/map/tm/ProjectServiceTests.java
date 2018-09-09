package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.business.IProjectService;
import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.dto.ProjectDTO;
import ma.map.tm.web.forms.ProjectForm;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProjectServiceTests {

	@Autowired
	private IProjectService projectService; 
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Test
	public void contextLoads() {
		assertThat(projectService).isNotNull();
		assertThat(projectRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		projectRepository.deleteAll();
		Project p1 = new Project("Pr A","Project A", new Date(), new Date());
		this.projectRepository.save(p1);
	}
	
	@Test
	public void createProject() {
		String title = "My Project "+Math.random()*100, 
				description = "Lorem ipsum description";
		
		ProjectDTO result = projectService.createProject(
				new ProjectForm(title, description, new Date(), new Date()));
		
		assertThat(result.getTitle()).isEqualTo(title);
		assertThat(result.getDescription()).isEqualTo(description);
	}
	
	@Test
	public void retrieveProjectById() {
		Project p = projectRepository.save(new Project("tre", "Desc", new Date(), new Date()));
		ProjectDTO result = projectService.retrieveProjectById(p.getIdProject());
		assertThat(result.getIdProject()).isEqualTo(p.getIdProject());
		assertThat(result.getDescription()).isNotEmpty();
	}
	
	@Test 
	public void retrieveAllProjects() {
		List<ProjectDTO> result = projectService.retrieveAllProjects();
		assertThat(result.size()).isGreaterThanOrEqualTo(1);
		assertThat(result.get(0).getIdProject()).isNotNull();
	}
	
	@Test
	public void removeProjectById() {
		Project p = projectRepository
				.save(new Project("Ti", "DEsc", new Date(), new Date()));
		
		assertThat(p.getIdProject()).isNotNull();
		
		projectService.removeProjectById(p.getIdProject());
		
		assertThat( projectRepository.existsById(p.getIdProject()) )
		.isEqualTo(false);
	}
	
	@Test
	public void updateProject() {
		Long id = projectService.createProject(new ProjectForm("T1", "D1", new Date(), new Date())).getIdProject();
		ProjectDTO dto = projectService.updateProject(id, new ProjectForm("New Title", "New Description", new Date(), null));
		assertThat(dto.getIdProject()).isEqualTo(id);
		assertThat(dto.getDescription()).isEqualTo("New Description");
		assertThat(dto.getStartDate()).isNotNull();
	}
	
}
