package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.dto.CaseDTO;
import ma.map.tm.entities.dto.TestExecutionDTO;
import ma.map.tm.web.forms.TestExecutionForm;

public interface IExecutionService {

	List<TestExecutionDTO> retrieveAllExecutions(Long idCase);

	TestExecutionDTO createExecution(Long idCase, TestExecutionForm data);

	TestExecutionDTO retrieveExecutionById(Long idExecution);

	TestExecutionDTO updateExecution(Long idExecution, TestExecutionForm data);

	Boolean removeExecutionById(Long idExecution);

}
