package ma.map.tm.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class TestExecution {

	private @Id @GeneratedValue Long idTestExecution;
	
	private Date dateOfExecution;
	private Boolean status; // OK or NOT OK
	private String remarks;
	
	@ManyToOne
	private TestCase testCase;
}
