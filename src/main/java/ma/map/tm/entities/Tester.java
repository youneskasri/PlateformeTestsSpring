package ma.map.tm.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Tester {
	
	private @Id @GeneratedValue Long idTester;
	private @NotBlank String firstName;
	private @NotBlank String lastName;
}
