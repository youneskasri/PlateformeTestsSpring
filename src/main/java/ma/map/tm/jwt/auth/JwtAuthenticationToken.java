package ma.map.tm.jwt.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.Getter;
import lombok.Setter;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken{

	@Getter @Setter
    private String token;
	

    public JwtAuthenticationToken(String token) {
        super(null, null);
        this.token = token;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }
    
    
    private static final long serialVersionUID = -5235046117039817960L;
}