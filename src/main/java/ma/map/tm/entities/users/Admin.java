package ma.map.tm.entities.users;

import javax.persistence.Entity;

import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Admin extends User {
	
	public Admin(String firstName, String lastName, String email, String password) {
		super(firstName, lastName, email, password);
		setRole(UserRole.ADMIN);
	}

}
