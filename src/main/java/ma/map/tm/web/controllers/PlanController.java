package ma.map.tm.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.business.IPlanService;
import ma.map.tm.entities.dto.PlanDTO;
import ma.map.tm.web.forms.PlanForm;

@RestController
@RequestMapping("/projects/{idProject}/plans")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanController {
	
	@Autowired
	private IPlanService planService;
	
	@GetMapping
	public List<PlanDTO> index(@PathVariable Long idProject) {
		return planService.retrieveAllPlans(idProject);
	}
	
	@PostMapping
	public PlanDTO create(@PathVariable Long idProject, @RequestBody PlanForm data) {
		return planService.createPlan(idProject, data);
	}
	
	@GetMapping("/{idPlan}")
	public PlanDTO show(@PathVariable Long idPlan) {
		System.out.println("idPlan " + idPlan);
		return planService.retrievePlanById(idPlan);
	}
	
	@PostMapping("/{idPlan}")
	public PlanDTO update(@PathVariable Long idPlan, @RequestBody PlanForm data) {
		return planService.updatePlan(idPlan, data);
	}
	
	@DeleteMapping("/{idPlan}")
	public Boolean destroy(@PathVariable Long idPlan) {
		return planService.removePlanById(idPlan);
	}
	
}
