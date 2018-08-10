package ma.map.tm.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.forms.TestExecutionForm;

@Entity
@Getter @Setter
@NoArgsConstructor
public class TestExecution {

	private @Id @GeneratedValue Long idTestExecution;
	
	private Date dateOfExecution;
	private Boolean status; // OK or NOT OK
	private String remarks;
	private String outputs;
	
	@JsonIgnore
	@ManyToOne
	private Case testCase;

	public void setData(TestExecutionForm data) {
		setDateOfExecution(data.getDateOfExecution());
		setStatus(data.getStatus());
		setRemarks(data.getRemarks());
		setOutputs(data.getOutputs());
	}
	
	
}
