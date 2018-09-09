package ma.map.tm;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ma.map.tm.dao.CaseRepository;
import ma.map.tm.dao.PlanRepository;
import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.dao.ScenarioRepository;
import ma.map.tm.dao.UserRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.Scenario;
import ma.map.tm.entities.TestCase;
import ma.map.tm.entities.TestType;
import ma.map.tm.entities.users.User;
import ma.map.tm.entities.users.UserRole;

//@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ProjectRepository repository;
	
	@Autowired
	private PlanRepository planRepository;
	@Autowired
	private ScenarioRepository scenarioRepository;
	@Autowired
	private CaseRepository caseRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	public DatabaseLoader(ProjectRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		Project p1 = new Project("Pr A","Project A", new Date(), new Date());
		Project p2 = new Project("Pr B","Project B", new Date(), new Date());
		Project p3 = new Project("Pr C","Project C", new Date(), new Date());
		Project p4 = new Project("Pr D","Project D", new Date(), new Date());
		this.repository.save(p1);
		this.repository.save(p2);
		this.repository.save(p3);
		this.repository.save(p4);
		
		Plan p = new Plan();
		p.setProject(p1);
		p.setTitle("Plan 1");
	
		
		p = planRepository.save(p);
		
		Scenario sc = new Scenario();
		sc.setPlan(p);
		sc.setTitle("Scenario 1");
	
		
		sc =scenarioRepository.save(sc);
		
		TestCase testCase = new TestCase();
		testCase.setScenario(sc);
		testCase.setObjective("OBjective");
		testCase.setType(TestType.MANUAL_TEST);
		testCase.setExpectedOutputs("123");
		testCase.setSteps("<h4>Holà</h4>");
		
		testCase = caseRepository.save(testCase);
		
		
		userRepository.save(new User("younes", "kasri", "youneskasri@gmail.com", "mdp", UserRole.ADMIN));
		userRepository.save(new User("tounes", "basri", "tounes@gmail.com", "mdp", UserRole.ARCHITECT));
		userRepository.save(new User("lounes", "3asri", "lounes@gmail.com", "mdp", UserRole.TESTER));
		
		
	}
}