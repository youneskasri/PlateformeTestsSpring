package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.lang.reflect.Method;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Project;

@Component
public class RepositoryTests implements CommandLineRunner {
	
	private final ProjectRepository projectRepository;
	
	@Autowired
	public RepositoryTests(ProjectRepository repository) {
		this.projectRepository = repository;
	}
	
	@Override
	public void run(String... strings) throws Exception {
		test("insertProject");
	}
	
	public void insertProject() throws Exception {
		Project p1 = new Project("Pr A","Project A", new Date());
		p1 = this.projectRepository.save(p1);
		//assertThat(p1.getDescription()).isEqualTo("Project A");
	}
	
	public void test(String methodName) {
	    try {
	    	Method method = RepositoryTests.class.getMethod(methodName);
			Object invoke = method.invoke(this);
			System.out.println("PASSED - " + methodName);
		} catch (Exception e) {
			System.out.println("FAILED - " + methodName);
			e.printStackTrace();
		}
	}
	
}
