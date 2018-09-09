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

import ma.map.tm.business.IExecutionService;
import ma.map.tm.entities.dto.TestExecutionDTO;
import ma.map.tm.web.forms.TestExecutionForm;


@RestController
@RequestMapping("/api/projects/{idProject}/plans/{idPlan}/scenarios/{idScenario}/cases/{idCase}/executions")
@CrossOrigin(origins = "*")
public class ExecutionController {

		@Autowired
		private IExecutionService executionService;
		
		@GetMapping
		public List<TestExecutionDTO> index(@PathVariable Long idCase) {
			return executionService.retrieveAllExecutions(idCase);
		}
		
		@PostMapping
		public TestExecutionDTO create(@PathVariable Long idCase, @RequestBody TestExecutionForm data) {
			System.out.println(data);
			return executionService.createExecution(idCase, data);
		}
		
		@GetMapping("/{idExecution}")
		public TestExecutionDTO show(@PathVariable Long idExecution) {
			return executionService.retrieveExecutionById(idExecution);
		}
		
		@PostMapping("/{idExecution}")
		public TestExecutionDTO update(@PathVariable Long idExecution, @RequestBody TestExecutionForm data) {
			return executionService.updateExecution(idExecution, data);
		}
		
		@DeleteMapping("/{idExecution}")
		public Boolean destroy(@PathVariable Long idExecution) {
			return executionService.removeExecutionById(idExecution);
		}
	}
