package ma.map.tm.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.ProjectDTO;
import ma.map.tm.web.ProjectForm;

@Service
public class ProjectService implements IProjectService{

	@Autowired
	private ProjectRepository projectRepository;
	
	@Override
	public List<ProjectDTO> retrieveAllProjects() {
		Iterable<Project> projects = projectRepository.findAll();
		List<ProjectDTO> filteredProjects = new ArrayList<>();
		projects.forEach(project -> 
			filteredProjects.add(ProjectDTO.convert(project))
		);
		return filteredProjects;
	}

	@Override
	public ProjectDTO createProject(ProjectForm data) {
		Project project = Project.extract(data);
		project = projectRepository.save(project);
		return ProjectDTO.convert(project);
	}

	@Override
	public ProjectDTO retrieveProjectById(Long id) {
		Optional<Project> opt = projectRepository.findById(id);
		return ProjectDTO.convert(opt.get());
	}

	@Override
	public Boolean removeProjectById(Long id) {
		if (projectRepository.existsById(id)) {
			projectRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public ProjectDTO updateProject(Long id, ProjectForm data) {
		Optional<Project> opt = projectRepository.findById(id);
		Project project = opt.get();
		project.setData(data);
		return ProjectDTO.convert(project);
	}

}
