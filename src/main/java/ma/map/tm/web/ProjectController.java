package ma.map.tm.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.business.IProjectService;
import ma.map.tm.entities.ProjectDTO;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

	@Autowired
	private IProjectService projectService;
	
	@GetMapping
	public List<ProjectDTO> index(){
		return projectService.retrieveAllProjects();
	}
	
	@PostMapping
	public ProjectDTO create(@RequestBody ProjectForm data) {
		return projectService.createProject(data);
	}
	
	@GetMapping("/{id}")
	public ProjectDTO show(@PathVariable Long id) {
		return projectService.retrieveProjectById(id);
	}
	
	/* Patch => CORS Problem :( */
	@PostMapping("/{id}")
	public ProjectDTO update(@PathVariable Long id, @RequestBody ProjectForm data) {
		System.out.println(id);
		System.out.println(data);
		return projectService.updateProject(id, data);
	}
	
	@DeleteMapping("/{id}")
	public Boolean destroy(@PathVariable Long id) {
		return projectService.removeProjectById(id);
	}
}

