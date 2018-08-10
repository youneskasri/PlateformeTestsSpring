package ma.map.tm.entities.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.Case;

@Data
@NoArgsConstructor
public class CaseDTO {

	private Long idTestCase;
	private String objective;
	private Date dateOfCreation;
	private String type;
	
	private String inputs;
	private String expectedOutputs;
	private String steps;
	
	private int numberOfExecutions;
	
	public static CaseDTO convert(Case c) {
		
		CaseDTO dto = new CaseDTO();
		
		dto.setIdTestCase(c.getIdTestCase());
		dto.setObjective(c.getObjective());
		dto.setDateOfCreation(c.getDateOfCreation());
		dto.setType(c.getType().toString());
		
		dto.setInputs(c.getInputs());
		dto.setExpectedOutputs(c.getExpectedOutputs());
		dto.setSteps(c.getSteps());
		
		dto.setNumberOfExecutions(c.getExecutions() != null ? c.getExecutions().size() : 0);
		
		System.out.println(dto);
		return dto;
	}

}
