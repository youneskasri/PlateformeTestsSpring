package ma.map.tm;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ma.map.tm.dao.ProjectRepository;
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
		Project p1 = new Project("Pr A","Project A", new Date(), new Date());
		Project p2 = new Project("Pr B","Project B", new Date(), new Date());
		Project p3 = new Project("Pr C","Project C", new Date(), new Date());
		Project p4 = new Project("Pr D","Project D", new Date(), new Date());
		this.repository.save(p1);
		this.repository.save(p2);
		this.repository.save(p3);
		this.repository.save(p4);
	}
}