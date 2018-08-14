package ma.map.tm.web.forms;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserForm {

	private String firstName;
	private String lastName;
	private String password;
	
	private String email;
	private String role;
}
