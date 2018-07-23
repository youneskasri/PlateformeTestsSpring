package ma.map.tm.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects/{idProject}/plans")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanController {
	
	@GetMapping
	public void index() {
		
	}
	
	@PostMapping
	public void create() {
		
	}
	
	@GetMapping("/{idPlan}")
	public void show() {
		
	}
	
	@PatchMapping("/{idPlan}")
	public void update() {
		
	}
	
	@DeleteMapping("/{idPlan}")
	public void destroy() {
		
	}
	
}
