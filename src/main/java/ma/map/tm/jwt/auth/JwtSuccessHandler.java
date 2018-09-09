package ma.map.tm.jwt.auth;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import ma.map.tm.jwt.ForbiddenRouteException;

public class JwtSuccessHandler implements AuthenticationSuccessHandler{
    
	@Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        System.out.println("Successfully Authentication");
        
        JwtUserDetails userDetails = (JwtUserDetails)authentication.getPrincipal();
        System.out.println(userDetails.getToken());
        System.out.println(userDetails.getUsername());
      	userDetails.getAuthorities().forEach(System.out::println);
        //checkForRoles(httpServletRequest, authentication);
    }

	@SuppressWarnings("unused")
	private void checkForRoles(HttpServletRequest httpServletRequest, Authentication authentication) {
		/* Check for Roles */
        if ( isPrivateRouteForAdmin(httpServletRequest)
        		&& !userIsAdmin(authentication)) {
        	throw new ForbiddenRouteException();
        }
        else 
        	System.out.println("Authorized access");
	}

	private boolean isPrivateRouteForAdmin(HttpServletRequest httpServletRequest) {
		
		String method = httpServletRequest.getMethod();
		String path = httpServletRequest.getServletPath();
		Boolean isPrivate = false;
		
		if (method.equals("DELETE") || method.equals("PATCH") || method.equals("PUT")) {
			isPrivate = true;
		}
		if (path.contains("admin")) {
			isPrivate = true;
		}
		
		System.out.println("Path = " + path);
		
		return isPrivate;
	}

	private boolean userIsAdmin(Authentication authentication) {
		return authentication.getAuthorities()
				.stream()
				.anyMatch(ga -> ga.getAuthority().equalsIgnoreCase("ADMIN"));
	}

}