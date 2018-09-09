package ma.map.tm.web.forms;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginForm {

	public LoginForm() {}
	
	private String email;
	private String password;
}
