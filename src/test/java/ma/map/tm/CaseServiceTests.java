package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.business.ICaseService;
import ma.map.tm.dao.CaseRepository;
import ma.map.tm.dao.ScenarioRepository;
import ma.map.tm.entities.Scenario;
import ma.map.tm.entities.TestCase;
import ma.map.tm.entities.TestType;
import ma.map.tm.entities.dto.CaseDTO;
import ma.map.tm.web.forms.CaseForm;
import ma.map.tm.web.forms.ScenarioForm;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CaseServiceTests {
	

	@Autowired
	private ICaseService caseService; 
	
	@Autowired
	private CaseRepository caseRepository;
	
	@Autowired
 	private ScenarioRepository scenarioRepository;
	
	@Test
	public void contextLoads() {
		assertThat(caseService).isNotNull();
		assertThat(caseRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		caseRepository.deleteAll();
	}
	
	@Test
	public void createCase() {

		Scenario scenario = createExampleScenario();
		
		String objective = "Test Case Objective";
		Date date = new Date();
		Boolean automated = true;
		
		CaseDTO result = caseService.createCase(scenario.getIdScenario(), new CaseForm(objective, date, automated, "cd","sd","ds"));
		
		assertThat(result).isNotNull();
		assertThat(result.getObjective()).isEqualTo(objective);		
		assertThat(result.getDateOfCreation().compareTo(date)).isEqualTo(0);
		assertThat(result.getType()).isEqualTo(TestType.AUTOMATED_TEST.toString());
	}
	
	@Test
	@Ignore
	public void retrieveCaseById() {

		Scenario scenario = createExampleScenario();
		String objective = "Test Case Objective";
		Date date = new Date();
		Boolean automated = true;		
		CaseDTO testCase = caseService.createCase(scenario.getIdScenario(), new CaseForm(objective, date, automated, "fd", "df", "dds"));
			
		CaseDTO result = caseService.retrieveCaseById(testCase.getIdTestCase());

		assertThat(result.getObjective()).isEqualTo(objective);		
		assertThat(result.getDateOfCreation().compareTo(date)).isEqualTo(0);
		assertThat(result.getType()).isEqualTo(TestType.AUTOMATED_TEST.toString());
	}

	
	@Test 
	@Ignore
	public void retrieveAllCases() {
		
		
		Scenario scenario = createExampleScenario();
		
		String objective = "Test Case Objective";
		Date date = new Date();
		TestCase testCase = new TestCase();
		testCase.setObjective(objective);
		testCase.setDateOfCreation(date);
		testCase.setType(TestType.AUTOMATED_TEST);
		testCase.setScenario(scenario);
		testCase.setSteps("steps");
		testCase.setExpectedOutputs("expectedOutputs");
		testCase = caseRepository.save(testCase);
		
		List<CaseDTO> result = caseService.retrieveAllCases(scenario.getIdScenario());
		assertThat(result.size()).isGreaterThanOrEqualTo(1);
		assertThat(result.get(0).getIdTestCase()).isNotNull();
		assertThat(result.get(0).getType()).isEqualTo(TestType.AUTOMATED_TEST.toString());
	}
	

	@Test
	public void removeCaseById() {
		TestCase testCase = createExampleTestCase();
		
		assertThat(testCase.getIdTestCase()).isNotNull();
		
		caseService.removeCaseById(testCase.getIdTestCase());
		
		assertThat( caseRepository.existsById(testCase.getIdTestCase()) )
		.isEqualTo(false);
	}

	private TestCase createExampleTestCase() {
		TestCase testCase = new TestCase();
		testCase.setData(new CaseForm("Obj", new Date(), false, "olo", "lili", "cq"));
		testCase = caseRepository.save(testCase);
		return testCase;
	}
	
	@Test
	public void updateCase() {
		
		String objective = "objective";
		Date date = new Date();
		Boolean automated = false;
		
		TestCase testCase = new TestCase();
		testCase.setData(new CaseForm(objective, date, automated, "ds","fd","sd"));
		testCase = caseRepository.save(testCase);
		
		assertThat(testCase.getIdTestCase()).isNotNull();
		assertThat(testCase.getType().toString()).isEqualTo(TestType.MANUAL_TEST.toString());
		
		

		String newObjective = "new objective";
		Date newDate = new Date();
		Boolean newAutomated = true;

		CaseDTO dto = caseService.updateCase(testCase.getIdTestCase(),
				new CaseForm(newObjective, newDate, newAutomated, "ds", "fd", "sd"));

		assertThat(dto.getObjective()).isEqualTo(newObjective);
		assertThat(dto.getDateOfCreation().compareTo(newDate)).isEqualTo(0);
		assertThat(dto.getType()).isEqualTo(TestType.AUTOMATED_TEST.toString());
	}
	
	private Scenario createExampleScenario() {
		Scenario scenario = new Scenario();
		scenario.setData(new ScenarioForm("Titel", "desc"));
		return scenarioRepository.save(scenario);
	}
	

}
