package ma.map.tm.entities.users;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.entities.Project;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Tester extends User {

	public Tester(String firstName, String lastName, String email, String password) {
		super(firstName, lastName, email, password);
		setRole(UserRole.TESTER);
	}
	
	@ManyToMany
	private List<Project> assignedProjects;
}
