package ma.map.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.Project;

//@CrossOrigin(allowCredentials = "false")
public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project findByTitle(String string);

}