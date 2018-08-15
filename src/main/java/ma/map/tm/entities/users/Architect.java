package ma.map.tm.entities.users;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Architect extends User {
	
	public Architect(String firstName, String lastName, String email, String password) {
		super(firstName, lastName, email, password);
		setRole(UserRole.ARCHITECT);
	}
}
