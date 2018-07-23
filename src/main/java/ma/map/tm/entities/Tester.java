package ma.map.tm.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Tester {
	
	private @Id @GeneratedValue Long idTester;
	private String firstName;
	private String lastName;
}
