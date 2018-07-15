package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProjectRepositoryTests {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Test
	public void contextLoads() {
		assertThat(projectRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		projectRepository.deleteAll();
	}
	
	@Test
	public void insertProject() {
		Project p1 = new Project("Pr A","Project A", new Date());
		p1 = this.projectRepository.save(p1);
		assertThat(p1.getDescription()).isEqualTo("Project A");
	}
		
	@Test 
	public void retrieveProjectByTitle() {
		String title = "Project Title";
		Project p = projectRepository.save(new Project(title, "Project B", new Date()));
		p = projectRepository.findByTitle(title);
		assertThat(p.getTitle()).isEqualTo(title);
		assertThat(p.getIdProject()).isNotNull();
	}
	
	@Test
	public void addTestPlanToProject() {
		// Given project
		Project p = projectRepository.save(new Project("001", "Project 001", new Date()));
		
		// add Test Plan and Save
		String planDescription = "Plan de test 1";
		Plan newTestPlan = new Plan(planDescription);
		p.addTestPlan(newTestPlan);
		p = projectRepository.save(p);
		
		// expect testPlan to exist
		newTestPlan = p.getTestPlans().get(0);
		assertThat(newTestPlan.getDescription()).isEqualTo(planDescription);
	}
	
	@Test
	public void deleteProject_withTestPlan() {
		
		// given Project with Test Plan
		Project p =new Project("001", "Project 001", new Date());
		Plan testPlan = new Plan("Test Plan 001");
		p.addTestPlan(testPlan);
		p = projectRepository.save(p);
		
		// delete project
		projectRepository.delete(p);
		
		// expect !existById
		assertThat(projectRepository.existsById(p.getIdProject()))
			.isEqualTo(false);
	}

}
