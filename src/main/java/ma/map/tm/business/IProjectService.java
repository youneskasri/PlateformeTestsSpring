package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.Project;
import ma.map.tm.entities.dto.ProjectDTO;
import ma.map.tm.entities.dto.ProjectReportDTO;
import ma.map.tm.web.forms.ProjectForm;

public interface IProjectService {
	
	List<ProjectDTO> retrieveAllProjects();

	ProjectDTO createProject(ProjectForm data);

	ProjectDTO retrieveProjectById(Long id);

	Boolean removeProjectById(Long id);

	ProjectDTO updateProject(Long id, ProjectForm data);

	ProjectReportDTO generateReport(Long idProject);
}
