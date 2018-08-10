package ma.map.tm.web.forms;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.Case;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaseForm {

	private String objective;
	private Date dateOfCreation = new Date();
	private Boolean automated;
	
	private String inputs;
	private String expectedOutputs;
	private String steps;
	
	public static Case extract(CaseForm data) {

		Case testCase = new Case();
		testCase.setData(data);
		return testCase;
	}

}
