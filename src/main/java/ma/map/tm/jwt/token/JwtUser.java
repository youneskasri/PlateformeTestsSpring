package ma.map.tm.jwt.token;

import lombok.Data;
import ma.map.tm.entities.users.User;


/**
 * Is used as a @RequestBody
 */
@Data
public class JwtUser {

    public JwtUser(User user) {
		setUsername(user.getEmail());
		setId(user.getIdUser());
		setRole(user.getRole().toString());
		System.out.println("##17##JwtUser->Role="+this.role);
	}
    
	public JwtUser() {}

	private String username;
    private long id;
    private String role;
}
