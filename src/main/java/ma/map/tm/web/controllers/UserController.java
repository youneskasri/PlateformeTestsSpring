package ma.map.tm.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import ma.map.tm.web.forms.UserForm;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private IUserService userService;
	
	@GetMapping
	public List<User> index(){
		return userService.retrieveAllUsers();
	}
	
	@PostMapping
	public User create(@RequestBody UserForm form) {
		return userService.createUser(form);
	}
	
	@GetMapping("/{idUser}")
	public User show(@PathVariable Long idUser) {
		return userService.retrieveUserById(idUser);
	}
	
	@PatchMapping("/{idUser}")
	public User update(@PathVariable Long idUser, @RequestBody UserForm form) {
		return userService.updateUser(idUser, form);
	}
	
	@PostMapping("/{idUser}/disable")
	public User disableAccount(@PathVariable Long idUser) {
		return userService.disableAccount(idUser);
	}
	
	@PostMapping("/{idUser}/enable")
	public User enableAccount(@PathVariable Long idUser) {
		return userService.enableAccount(idUser);
	}
	
	
	@DeleteMapping("/{idUser}")
	public Boolean delete(@PathVariable Long idUser) {
		return userService.removeUserById(idUser);
	}
	
}
