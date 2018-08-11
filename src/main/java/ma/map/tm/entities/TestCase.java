package ma.map.tm.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.forms.CaseForm;

@Entity
@Getter @Setter
@NoArgsConstructor
public class TestCase {

	private @Id @GeneratedValue Long idTestCase;
	
	private @NotBlank String objective;
	private Date dateOfCreation;
	private TestType type; /* defaultValue=MANUAL, in setData() */
	private String inputs;
	private @NotEmpty String expectedOutputs;
	
	@Column(columnDefinition="TEXT")
	private @NotEmpty String steps;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="testCase")
	List<TestExecution> executions;
	
	@JsonIgnore
	@ManyToOne
	private Scenario scenario;

	public void setData(CaseForm data) {
		setObjective(data.getObjective());
		setDateOfCreation(data.getDateOfCreation());
		
		if ( data.getAutomated()!=null && data.getAutomated() == true ) {
			setType(TestType.AUTOMATED_TEST);
		} else {
			setType(TestType.MANUAL_TEST);
		}
		
		setInputs(data.getInputs());
		setExpectedOutputs(data.getExpectedOutputs());
		setSteps(data.getSteps());
	}
}


