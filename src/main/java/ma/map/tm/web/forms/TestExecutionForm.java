package ma.map.tm.web.forms;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.TestExecution;

@Data
@NoArgsConstructor
public class TestExecutionForm {
	
	private Date dateOfExecution = new Date();
	private Boolean status; // OK or NOT OK
	private String remarks;
	private String outputs;
	
	
	public static TestExecution extract(TestExecutionForm data) {
		
		TestExecution exec = new TestExecution();
		exec.setData(data);	
		return exec;
	}
 
}
