package ma.map.tm.jwt.auth;


import java.io.IOException;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

/*
 * Used when trying to access a resource with the Token
 */
public class JwtAuthenticationTokenFilter extends AbstractAuthenticationProcessingFilter {

    public JwtAuthenticationTokenFilter() {
        super("/api/**");
    }

    private Boolean authorizeMethodOPTIONS = false;
    public JwtAuthenticationTokenFilter(Boolean authorizeMethodOPTIONS) {
		this();
		this.authorizeMethodOPTIONS = authorizeMethodOPTIONS;
	}

	@Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {

        String method = httpServletRequest.getMethod();
        if (method.equals("OPTIONS") && authorizeMethodOPTIONS) {
        	return getAuthenticationManager().authenticate(new JwtAuthenticationToken("ALLOW-OPTIONS"));
        }
		
		String header = httpServletRequest.getHeader("Authorization");

        if (header == null || !header.startsWith("Token ")) {
            throw new RuntimeException("JWT Token is missing");
        }
        

        String authenticationToken = header.substring(6);

        JwtAuthenticationToken token = new JwtAuthenticationToken(authenticationToken);
        return getAuthenticationManager().authenticate(token);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }

}