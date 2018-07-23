package ma.map.tm.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.assertj.core.util.Arrays;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import ma.map.tm.entities.ProjectDTO;
import ma.map.tm.web.ProjectForm;


@Service
public class ProjectServiceForTests implements IProjectService {

	@Override
	public List<ProjectDTO> retrieveAllProjects() {
		List<ProjectDTO> projects = new ArrayList<>();
		projects.add(new ProjectDTO(001L, "Project A", "Lorem Ipsum lorem ipsum A", new Date(), null, "Younes Kasri"));
		projects.add(new ProjectDTO(001L, "Project B", "Lorem Ipsum lorem ipsum B", new Date(), null, "Anas Bob"));
		projects.add(new ProjectDTO(001L, "Project C", "Lorem Ipsum lorem ipsum C", new Date(), null, "Bob Anas"));
		return projects;
	}

	@Override
	public ProjectDTO createProject(ProjectForm data) {
		//TODO
		return null;
	}

	@Override
	public ProjectDTO retrieveProjectById(Long id) {
		return new ProjectDTO(001L, "Project A", "Lorem Ipsum lorem ipsum A", new Date(), null, "Younes Kasri");	
	}

	@Override
	public Boolean removeProjectById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProjectDTO updateProject(Long id, ProjectForm data) {
		// TODO Auto-generated method stub
		return null;
	}

}
