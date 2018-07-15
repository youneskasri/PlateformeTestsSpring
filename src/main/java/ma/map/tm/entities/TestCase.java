package ma.map.tm.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class TestCase {

	private @Id @GeneratedValue Long idTestCase;
	private String objective;
	private Date dateOfCreation;
	private TestType type;
}

enum TestType {
	AUTOMATED_TEST, MANUAL_TEST
}
