package ma.map.tm.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.business.IUserService;
import ma.map.tm.entities.users.User;
import ma.map.tm.jwt.auth.JwtUserDetails;
import ma.map.tm.web.forms.UserForm;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private IUserService userService;
	
	
	@GetMapping
	public List<User> index(Authentication authentication){
		userIsAdmin(authentication);
		return userService.retrieveAllUsers();
	}
	
	@PostMapping
	public User create(Authentication authentication, @RequestBody UserForm form) {
		userIsAdmin(authentication);
		return userService.createUser(form);
	}
	
	@GetMapping("/{idUser}")
	public User show(Authentication authentication, @PathVariable Long idUser) {
		userIsAdmin(authentication);
		return userService.retrieveUserById(idUser);
	}
	
	@PatchMapping("/{idUser}")
	public User update(Authentication authentication, @PathVariable Long idUser, @RequestBody UserForm form) {
		userIsAdmin(authentication);
		return userService.updateUser(idUser, form);
	}
		
	@PostMapping("/{idUser}/disable")
	public User disableAccount(Authentication authentication, @PathVariable Long idUser) {
		userIsAdmin(authentication);
		return userService.disableAccount(idUser);
	}
	
	@PostMapping("/{idUser}/enable")
	public User enableAccount(Authentication authentication, @PathVariable Long idUser) {
		userIsAdmin(authentication);
		return userService.enableAccount(idUser);
	}
	
	@DeleteMapping("/{idUser}")
	public Boolean delete(Authentication authentication, @PathVariable Long idUser) {
		userIsAdmin(authentication);
		return userService.removeUserById(idUser);
	}
	
	
	private void userIsAdmin(Authentication authentication) {
		JwtUserDetails userDetails = (JwtUserDetails) authentication.getPrincipal();
		StringBuffer rolesBuffer = new StringBuffer();
		userDetails.getAuthorities().forEach(a -> {
			rolesBuffer.append(a.getAuthority()+'-');					
		});
		if (rolesBuffer.toString().contains("ADMIN")) {
			System.out.println("IS ADMIN");
		} else {
			throw new RuntimeException("Vous n'êtes pas autorisé");
		}
	}
	
}
