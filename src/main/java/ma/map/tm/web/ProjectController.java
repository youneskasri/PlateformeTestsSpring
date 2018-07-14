package ma.map.tm.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.business.IProjectService;
import ma.map.tm.entities.ProjectDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

	@Autowired
	private IProjectService projectService;
	
	@GetMapping("/projects")
	public List<ProjectDTO> index(){
		return projectService.retrieveAllProjects();
	}
	
	@PostMapping("/projects")
	public ProjectDTO create(@RequestBody ProjectForm data) {
		return projectService.createProject(data);
	}
	
	@GetMapping("/projects/{id}")
	public ProjectDTO show(@PathVariable Long id) {
		return projectService.retrieveProjectById(id);
	}

	@PatchMapping("/projects/{id}")
	public ProjectDTO update(@PathVariable Long id, @RequestBody ProjectForm data) {
		return projectService.updateProject(id, data);
	}
	
	@DeleteMapping("/projects/{id}")
	public Boolean destroy(@PathVariable Long id) {
		return projectService.removeProjectById(id);
	}
}

