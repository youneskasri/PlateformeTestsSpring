package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.ProjectDTO;
import ma.map.tm.web.ProjectForm;

public interface IProjectService {
	
	List<ProjectDTO> retrieveAllProjects();

	ProjectDTO createProject(ProjectForm data);

	ProjectDTO retrieveProjectById(Long id);

	Boolean removeProjectById(Long id);

	ProjectDTO updateProject(Long id, ProjectForm data);
}
