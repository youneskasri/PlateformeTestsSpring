package ma.map.tm.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.CaseForm;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Case {

	private @Id @GeneratedValue Long idTestCase;
	private String objective;
	private Date dateOfCreation;
	private TestType type;
	
	private String inputs;
	private String expectedOutputs;
	private String steps;
	
	@ManyToOne
	private Scenario scenario;

	public void setData(CaseForm data) {
		setObjective(data.getObjective());
		setDateOfCreation(data.getDateOfCreation());
		
		if ( data.getAutomated() == true ) {
			setType(TestType.AUTOMATED_TEST);
		} else {
			setType(TestType.MANUAL_TEST);
		}
		
		setInputs(data.getInputs());
		setExpectedOutputs(data.getExpectedOutputs());
		setSteps(data.getSteps());
	}
}


