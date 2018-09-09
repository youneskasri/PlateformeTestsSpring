package ma.map.tm.jwt;


import java.util.Collection;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.jwt.auth.JwtUserDetails;

@RestController
@RequestMapping("/rest/hello")
public class HelloController {

	@GetMapping
    public String hello(Authentication auth) {
		
		
		System.out.println(auth.getClass()); // UsernamePasswordAuthenticationToken
		System.out.println(auth.getPrincipal().getClass()); // JwtUserDetails
		
		JwtUserDetails jud = (JwtUserDetails)auth.getPrincipal();
		
		String token = jud.getToken();
		String username = jud.getUsername();
		Collection<? extends GrantedAuthority> authorities = jud.getAuthorities();
		authorities.forEach(System.out::println);
		
        return "Hello World" + username;
    }
	
    @PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/admin")
	public String helloAdmin() {
		System.out.println("D'khol l Controller /admin");
		return "Only for admin";
	}
}