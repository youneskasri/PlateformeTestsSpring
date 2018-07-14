package ma.map.tm.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import ma.map.tm.entities.Project;

//@CrossOrigin(allowCredentials = "false")
public interface ProjectRepository extends CrudRepository<Project, Long> {

}