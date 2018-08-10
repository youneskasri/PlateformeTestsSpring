package ma.map.tm.business.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ma.map.tm.business.IExecutionService;
import ma.map.tm.dao.CaseRepository;
import ma.map.tm.dao.ExecutionRepository;
import ma.map.tm.entities.Case;
import ma.map.tm.entities.TestExecution;
import ma.map.tm.entities.dto.TestExecutionDTO;
import ma.map.tm.web.forms.TestExecutionForm;

@Service
public class ExecutionService implements IExecutionService {

	
	@Autowired
	private ExecutionRepository executionRepository;
	
	@Autowired
	private CaseRepository caseRepository;
	
	
	@Override
	public List<TestExecutionDTO> retrieveAllExecutions(Long idCase) {
		Optional<Case> opt = caseRepository.findById(idCase);
		Case testCase = opt.get();
		
		TestExecution execution = new TestExecution();
		execution.setTestCase(testCase);
		
		Sort sortByDateDesc = new Sort(Sort.Direction.DESC, "dateOfExecution");
		List<TestExecution> executions = executionRepository.findAll(Example.of(execution), sortByDateDesc);
		
		List<TestExecutionDTO> executionsDTO = new ArrayList<>();
		executions.forEach(ex -> {
			executionsDTO.add( TestExecutionDTO.convert(ex));
		});
		
		return executionsDTO;
	}

	@Override
	public TestExecutionDTO createExecution(Long idCase, TestExecutionForm data) {
		Optional<Case> opt = caseRepository.findById(idCase);
		Case testCase = opt.get();
		
		TestExecution execution = TestExecutionForm.extract(data);
		execution.setTestCase(testCase);
		
		execution = executionRepository.save(execution);
		return TestExecutionDTO.convert(execution);
	}

	@Override
	public TestExecutionDTO retrieveExecutionById(Long idExecution) {
		Optional<TestExecution> opt = executionRepository.findById(idExecution);
		return TestExecutionDTO.convert(opt.get());
	}

	@Override
	public TestExecutionDTO updateExecution(Long idExecution, TestExecutionForm data) {
		Optional<TestExecution> opt = executionRepository.findById(idExecution);
		TestExecution execution = opt.get();
		execution.setData(data);
		execution = executionRepository.save(execution);
		return TestExecutionDTO.convert(execution);
	}

	@Override
	public Boolean removeExecutionById(Long idExecution) {
		if (executionRepository.existsById(idExecution)) {
			executionRepository.deleteById(idExecution);
			return true;
		}
		return false;
	}

}
