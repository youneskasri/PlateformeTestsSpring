package ma.map.tm.web;

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

import ma.map.tm.business.IScenarioService;
import ma.map.tm.entities.PlanDTO;

@RestController
@RequestMapping("/projects/{idProject}/plans/{idPlan}/scenarios")
@CrossOrigin(origins = "http://localhost:3000")
public class ScenarioController {

	@Autowired
	private IScenarioService scenarioService;
	
	@GetMapping
	public List<ScenarioDTO> index(@PathVariable Long idPlan) {
		return scenarioService.retrieveAllScenarios(idPlan);
	}
	
	@PostMapping
	public PlanDTO create(@PathVariable Long idProject, @RequestBody PlanForm data) {
		return scenarioService.createPlan(idProject, data);
	}
	
	@GetMapping("/{idPlan}")
	public PlanDTO show(@PathVariable Long idPlan) {
		System.out.println("idPlan " + idPlan);
		return scenarioService.retrievePlanById(idPlan);
	}
	
	@PostMapping("/{idPlan}")
	public PlanDTO update(@PathVariable Long idPlan, @RequestBody PlanForm data) {
		return scenarioService.updatePlan(idPlan, data);
	}
	
	@DeleteMapping("/{idPlan}")
	public Boolean destroy(@PathVariable Long idPlan) {
		return scenarioService.removePlanById(idPlan);
	}
}
