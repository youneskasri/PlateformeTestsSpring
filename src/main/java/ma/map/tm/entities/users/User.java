package ma.map.tm.entities.users;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.entities.Project;
import ma.map.tm.web.forms.UserForm;

@Entity
@Getter @Setter
@NoArgsConstructor
@Inheritance(
    strategy = InheritanceType.JOINED
)
public class User {
	
	private @Id @GeneratedValue Long idUser;
	private @NotBlank String firstName;
	private @NotBlank String lastName;
	
	private @NotBlank String email;
	@JsonIgnore 
	private @NotBlank String password;
	
	private Boolean active = true;
	private UserRole role;
	

	@ManyToMany
	private List<Project> assignedProjects;
	
	public static User makeUser(UserForm form) {
		UserRole role = UserRole.valueOf(form.getRole());
		//return makeUser(form.getFirstName(), form.getLastName(), form.getEmail(), form.getPassword(), role);
		return new User(form.getFirstName(), form.getLastName(), form.getEmail(), form.getPassword(), role);
	}
	
	public User(String firstName, String lastName, String email, String password) {
		this(firstName, lastName, email, password, UserRole.TESTER);
	}
	
	public User(String firstName, String lastName, String email, String password, UserRole role) {
		setFirstName(firstName);
		setLastName(lastName);
		setEmail(email);
		setPassword(password);
		setRole(role);
	}

	
	@Deprecated
	public static User makeUser(String firstName, String lastName, String email, String password, UserRole role) {
		switch(role) {
			case ADMIN : return new Admin(firstName, lastName, email, password);
			case MANAGER : return new Manager(firstName, lastName, email, password);
			case ARCHITECT : return new Architect(firstName, lastName, email, password);
			case TESTER : return new Tester(firstName, lastName, email, password);
		}
		
		throw new RuntimeException("Invalid Data Type");
	}

}

