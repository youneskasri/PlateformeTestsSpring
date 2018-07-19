package ma.map.tm;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final ProjectRepository repository;

	@Autowired
	public DatabaseLoader(ProjectRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		Project p1 = new Project("Pr A","Project A", new Date());
		this.repository.save(p1);
	}
}