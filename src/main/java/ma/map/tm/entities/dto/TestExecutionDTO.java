package ma.map.tm.entities.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.TestExecution;

@Data
@NoArgsConstructor
public class TestExecutionDTO {
	
	private Long idTestExecution;
	private Date dateOfExecution;
	private Boolean status; // OK or NOT OK
	private String remarks;
	private String outputs;
	
	public static TestExecutionDTO convert(TestExecution execution) {
		TestExecutionDTO dto = new TestExecutionDTO();
		dto.setIdTestExecution(execution.getIdTestExecution());
		dto.setDateOfExecution(execution.getDateOfExecution());
		dto.setStatus(execution.getStatus());
		dto.setRemarks(execution.getRemarks());
		dto.setOutputs(execution.getOutputs());
		
		return dto;
	}
}
