package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.business.IPlanService;
import ma.map.tm.dao.PlanRepository;
import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.dto.PlanDTO;
import ma.map.tm.web.forms.PlanForm;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlanServiceTests {

	@Autowired
	private IPlanService planService; 
	
	@Autowired
	private PlanRepository planRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Test
	public void contextLoads() {
		assertThat(planService).isNotNull();
		assertThat(planRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		planRepository.deleteAll();
		projectRepository.deleteAll();
	}
	
	@Test
	public void createPlan() {
		Project pr = projectRepository.save(new Project());
		Plan plan = new Plan("Plan Title", "Desc");
		
		PlanDTO planDTO = planService.createPlan(pr.getIdProject(), new PlanForm(plan));
		assertThat(planDTO.getIdPlan()).isGreaterThanOrEqualTo(1L);
		assertThat(planDTO.getTitle()).isEqualTo(plan.getTitle());
	}
	
	@Test
	public void retrievePlanById() {
		Project pr = projectRepository.save(new Project());
		Plan plan = new Plan("Plan Title", "Desc");
		plan.setProject(pr);
		planRepository.save(plan);
		
		PlanDTO result = planService.retrievePlanById(plan.getIdPlan());
	
		assertThat(result.getTitle()).isEqualTo("Plan Title");
		assertThat(result.getIdPlan()).isEqualTo(plan.getIdPlan());
	}
	
	@Test 
	public void retrieveAllPlans() {
		Project pr = projectRepository.save(new Project());
		Plan plan = new Plan("Plan Title", "Desc");
		plan.setProject(pr);
		planRepository.save(plan);
		
		List<PlanDTO> plans = planService.retrieveAllPlans(pr.getIdProject());
		assertThat(plans).isNotNull();
		assertThat(plans.size()).isGreaterThanOrEqualTo(1);
	}
	
	@Test
	public void removePlanById() {
		Project pr = projectRepository.save(new Project());
		Plan plan = new Plan("Plan Title", "Desc");
		plan.setProject(pr);
		planRepository.save(plan);
		
		assertThat(planService.removePlanById(plan.getIdPlan())).isEqualTo(true);
		assertThat(planRepository.existsById(plan.getIdPlan())).isEqualTo(false);
	}
	
	
	public void updatePlan() {
		// TODO
	}
	
}
