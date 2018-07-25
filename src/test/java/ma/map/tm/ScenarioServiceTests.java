package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.business.IScenarioService;
import ma.map.tm.dao.PlanRepository;
import ma.map.tm.dao.ScenarioRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Scenario;
import ma.map.tm.entities.ScenarioDTO;
import ma.map.tm.web.ScenarioForm;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ScenarioServiceTests {

	@Autowired
	private IScenarioService scenarioService; 
	
	@Autowired
	private ScenarioRepository scenarioRepository;
	
	 @Autowired
	 private PlanRepository planRepository;
	
	@Test
	public void contextLoads() {
		assertThat(scenarioService).isNotNull();
		assertThat(scenarioRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		scenarioRepository.deleteAll();
	}
	
	@Test
	public void createScenario() {
		String title = "My Scenario "+Math.random()*100, 
				description = "Lorem ipsum description";
		
		Plan plan = planRepository.save(new Plan("Plan Test", "Desc Plan Test"));
		
		ScenarioDTO result = scenarioService.createScenario(plan.getIdPlan(), new ScenarioForm(title, description));
		
		assertThat(result.getTitle()).isEqualTo(title);
		assertThat(result.getDescription()).isEqualTo(description);
	}
	
	@Test
	public void retrieveScenarioById() {
		String title = "My Scenario "+Math.random()*100, 
				description = "Lorem ipsum description";
		
		Plan plan = planRepository.save(new Plan("Plan Test", "Desc Plan Test"));
		ScenarioDTO scenario = scenarioService.createScenario(plan.getIdPlan(), new ScenarioForm(title, description));
		
		ScenarioDTO result = scenarioService.retrieveScenarioById(scenario.getIdScenario());
		assertThat(result.getIdScenario()).isEqualTo(scenario.getIdScenario());
		assertThat(result.getDescription()).isNotEmpty();
	}
	
	@Test 
	public void retrieveAllScenarios() {
		
		String title = "Scenario Title", description = "Scenario Description";
		
		Plan plan = planRepository.save(new Plan("Plan Test", "Desc Plan Test"));
		
		Scenario scenario = new Scenario();
		scenario.setTitle(title);
		scenario.setDescription(description);
		scenario.setPlan(plan);
		scenario = scenarioRepository.save(scenario);
		
		List<ScenarioDTO> result = scenarioService.retrieveAllScenarios(plan.getIdPlan());
		assertThat(result.size()).isGreaterThanOrEqualTo(1);
		assertThat(result.get(0).getIdScenario()).isNotNull();
	}
	
	@Test
	public void removeProjectById() {
		Scenario scenario = scenarioRepository.save(new Scenario());
		
		assertThat(scenario.getIdScenario()).isNotNull();
		
		scenarioService.removeScenarioById(scenario.getIdScenario());
		
		assertThat( scenarioRepository.existsById(scenario.getIdScenario()) )
		.isEqualTo(false);
	}
	
	@Test
	public void updateProject() {
		String title = "Scenario Title", description = "Scenario Description";
		Scenario scenario = new Scenario();
		scenario.setTitle(title);
		scenario.setDescription(description);
		
		Long id = scenarioRepository.save(scenario).getIdScenario();
		
		String newTitle = "New Title gergzer", newDescription = "New Description zefzefaze";
		
		ScenarioDTO dto = scenarioService
				.updateScenario(id, new ScenarioForm(newTitle, newDescription));
		
		assertThat(dto.getIdScenario()).isEqualTo(id);
		assertThat(dto.getDescription()).isEqualTo(newDescription);
		assertThat(dto.getTitle()).isEqualTo(newTitle);
	}

}
