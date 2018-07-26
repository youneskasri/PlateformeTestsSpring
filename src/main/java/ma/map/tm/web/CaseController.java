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

import ma.map.tm.business.ICaseService;
import ma.map.tm.entities.CaseDTO;
import ma.map.tm.entities.ScenarioDTO;

@RestController
@RequestMapping("/projects/{idProject}/plans/{idPlan}/scenarios/{idScenario}/cases")
@CrossOrigin(origins = "http://localhost:3000")
public class CaseController {

	@Autowired
	private ICaseService caseService;
	
	@GetMapping
	public List<CaseDTO> index(@PathVariable Long idScenario) {
		return caseService.retrieveAllCases(idScenario);
	}
	
	@PostMapping
	public CaseDTO create(@PathVariable Long idScenario, @RequestBody CaseForm data) {
		System.out.println(data);
		return caseService.createCase(idScenario, data);
	}
	
	@GetMapping("/{idCase}")
	public CaseDTO show(@PathVariable Long idCase) {
		return caseService.retrieveCaseById(idCase);
	}
	
	@PostMapping("/{idCase}")
	public CaseDTO update(@PathVariable Long idCase, @RequestBody CaseForm data) {
		return caseService.updateCase(idCase, data);
	}
	
	@DeleteMapping("/{idScenario}")
	public Boolean destroy(@PathVariable Long idCase) {
		return caseService.removeCaseById(idCase);
	}
}
