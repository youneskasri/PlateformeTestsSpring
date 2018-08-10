package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import lombok.var;
import ma.map.tm.business.IExecutionService;
import ma.map.tm.dao.CaseRepository;
import ma.map.tm.dao.ExecutionRepository;
import ma.map.tm.entities.Case;
import ma.map.tm.entities.TestExecution;
import ma.map.tm.entities.dto.TestExecutionDTO;
import ma.map.tm.web.forms.TestExecutionForm;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ExecutionServiceTests {

		@Autowired
		private IExecutionService executionService; 
		
		@Autowired
		private CaseRepository caseRepository;
		
		@Autowired
	 	private ExecutionRepository executionRepository;
		
		@Test
		public void contextLoads() {
			assertThat(executionService).isNotNull();
			assertThat(executionRepository).isNotNull();
		}
		
		@Before	
		public void cleanRepository() {
			executionRepository.deleteAll();
		}
		
		@Test
		public void createExecution() {
		
			Case testCase = caseRepository.save(new Case());
		
			
			String outputs="output", remarks="No remarks";
			Boolean status = true;
			
			var form = new TestExecutionForm();
			form.setOutputs(outputs);
			form.setRemarks(remarks);
			form.setStatus(status);
			
			TestExecutionDTO result
				= executionService.createExecution(testCase.getIdTestCase(), form);
			
			assertThat(result).isNotNull();
			assertThat(result.getOutputs()).isEqualTo(outputs);		
			assertThat(result.getStatus()).isEqualTo(status);
			assertThat(result.getRemarks()).isEqualTo(remarks);
		}
		
		@Test
		public void retrieveExecutionById() {

			Case testCase = caseRepository.save(new Case());
			
			String outputs="output", remarks="No remarks";
			Boolean status = true;
			
			var form = new TestExecutionForm();
			form.setOutputs(outputs);
			form.setRemarks(remarks);
			form.setStatus(status);
			
			TestExecutionDTO dto
				= executionService.createExecution(testCase.getIdTestCase(), form);
			
			
			TestExecutionDTO result = executionService.retrieveExecutionById(dto.getIdTestExecution());

			/* A voir si ça passe */
			assertThat(result.getIdTestExecution()).isEqualTo(dto.getIdTestExecution());
			assertThat(result.getOutputs()).isEqualTo(dto.getOutputs());
			assertThat(result.getRemarks()).isEqualTo(dto.getRemarks());
			assertThat(result.getStatus()).isEqualTo(dto.getStatus());
		}
		
		@Test 
		public void retrieveAllExecution() {
			
			
			Case testCase = caseRepository.save(new Case());
			
			String outputs="output", remarks="No remarks";
			Boolean status = true;
			
			var form = new TestExecutionForm();
			form.setOutputs(outputs);
			form.setRemarks(remarks);
			form.setStatus(status);
			
			TestExecutionDTO dto
				= executionService.createExecution(testCase.getIdTestCase(), form);
			
 
			
			List<TestExecutionDTO> result = executionService.retrieveAllExecutions(testCase.getIdTestCase());
			assertThat(result.size()).isGreaterThanOrEqualTo(1);
			assertThat(result.get(0).getIdTestExecution()).isEqualTo(dto.getIdTestExecution());
			assertThat(result.get(0).getOutputs()).isEqualTo(dto.getOutputs());
			assertThat(result.get(0).getRemarks()).isEqualTo(dto.getRemarks());
			assertThat(result.get(0).getStatus()).isEqualTo(dto.getStatus());
		}
		

		@Test
		public void removeCaseById() {
			
			TestExecution execution = executionRepository.save(new TestExecution());
			assertThat(execution.getIdTestExecution()).isNotNull();
			
			executionService.removeExecutionById(execution.getIdTestExecution());
			
			assertThat( executionRepository.existsById(execution.getIdTestExecution()) )
			.isEqualTo(false);
		}
		
		
		public void updateCase() {

		}
		
}