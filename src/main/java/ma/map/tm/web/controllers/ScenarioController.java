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

import ma.map.tm.business.IScenarioService;
import ma.map.tm.entities.dto.ScenarioDTO;
import ma.map.tm.web.forms.ScenarioForm;

@RestController
@RequestMapping("/api/projects/{idProject}/plans/{idPlan}/scenarios")
@CrossOrigin(origins = "*")
public class ScenarioController {

	@Autowired
	private IScenarioService scenarioService;
	
	@GetMapping
	public List<ScenarioDTO> index(@PathVariable Long idPlan) {
		return scenarioService.retrieveAllScenarios(idPlan);
	}
	
	@PostMapping
	public ScenarioDTO create(@PathVariable Long idPlan, @RequestBody ScenarioForm data) {
		return scenarioService.createScenario(idPlan, data);
	}
	
	@GetMapping("/{idScenario}")
	public ScenarioDTO show(@PathVariable Long idScenario) {
		System.out.println("idScenario " + idScenario);
		return scenarioService.retrieveScenarioById(idScenario);
	}
	
	@PostMapping("/{idScenario}")
	public ScenarioDTO update(@PathVariable Long idScenario, @RequestBody ScenarioForm data) {
		return scenarioService.updateScenario(idScenario, data);
	}
	
	@DeleteMapping("/{idScenario}")
	public Boolean destroy(@PathVariable Long idScenario) {
		return scenarioService.removeScenarioById(idScenario);
	}
}
