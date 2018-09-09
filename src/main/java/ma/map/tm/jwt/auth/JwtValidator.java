package ma.map.tm.jwt.auth;


import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import ma.map.tm.jwt.token.JwtUser;

/*
 * Used in RetrieveUser in JwtAuthenticationProvider
 */
@Component
public class JwtValidator {


    private String secret = "youtube";

    public JwtUser validate(String token) {
    	
        JwtUser jwtUser = null;
        
        /*
         * OPTIONS Method should pass by this filter
         */
    	if (token.contains("ALLOW-OPTIONS")) {
    		jwtUser = new JwtUser();
    		jwtUser.setRole("ADMIN");
    		return jwtUser;
    	}
    	
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            jwtUser = new JwtUser();            
            jwtUser.setUsername(body.getSubject());
            jwtUser.setId(Long.parseLong((String) body.get("userId")));
            jwtUser.setRole((String) body.get("role"));
        }
        catch (Exception e) {
            System.out.println(e);
        }

        return jwtUser;
    }
}