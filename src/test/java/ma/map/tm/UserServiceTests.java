package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.business.IUserService;
import ma.map.tm.dao.UserRepository;
import ma.map.tm.entities.users.Architect;
import ma.map.tm.entities.users.Manager;
import ma.map.tm.entities.users.Tester;
import ma.map.tm.entities.users.User;
import ma.map.tm.entities.users.UserRole;
import ma.map.tm.web.forms.UserForm;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTests {

	@Autowired
	private IUserService userService; 
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void contextLoads() {
		assertThat(userService).isNotNull();
		assertThat(userRepository).isNotNull();
	}
	
	@Before	
	public void cleanRepository() {
		userRepository.deleteAllInBatch();
	}
	
		
	@Test
	public void retrieveAllUsers() {
		
		String firstName = "tounès", lastName = "basri",
				email = "tounesbasri@gmail.com", password = "mdp";
		
		/* I need to fill the data b/c of hibernate constraint @NotBlank */
		userRepository.save(new Manager(firstName, lastName, email, password));
		userRepository.save(new Tester(firstName, lastName, email, password));
		userRepository.save(new Tester(firstName, lastName, email, password));
		userRepository.save(new Architect(firstName, lastName, email, password));
		
		List<User> users = userService.retrieveAllUsers();
		assertThat(users.size()).isEqualTo(4);
	}
	
	@Test
	public void createUser() {
		String firstName = "tounès", lastName = "basri",
				email = "tounesbasri@gmail.com", password = "mdp",
				role = "ADMIN";
		
		UserForm form = createUserForm(firstName, lastName, email, password, role);
	
		User user = userService.createUser(form);
		
		assertUserFields(firstName, lastName, email, password, role, user);
	}
	
	@Test
	public void retrieveUserById() {
		
		String firstName = "tounès", lastName = "basri",
				email = "tounesbasri@gmail.com", password = "mdp",
				role = "ADMIN";
		User user = new User(firstName, lastName, email, password, UserRole.valueOf(role));
		user = userRepository.save(user);
		
		User foundUser = userService.retrieveUserById(user.getIdUser());
		
		assertUserFields(firstName, lastName, email, password, role, foundUser);
	}
	
	@Test
	public void updateUser() {
		
		User user = userRepository.save(new Tester("a", "b", "c", "d"));
		Long idUser = user.getIdUser();
		
		String firstName = "tounès", lastName = "basri",
				email = "tounesbasri@gmail.com", password = "mdp",
				role = "ADMIN";
		
		UserForm form = createUserForm(firstName, lastName, email, password, role);
		
		User foundUser = userService.updateUser(idUser, form);
		
		assertUserFields(firstName, lastName, email, password, role, foundUser);
	}
	
	@Test
	public void deleteUser() {
		User user = userRepository.save(new Tester("a", "b", "c", "d"));
		Long idUser = user.getIdUser();
		
		userService.removeUserById(idUser);
		
		assertThat(userRepository.existsById(idUser)).isEqualTo(false);
	}

	public void disableAccount() {
		User user = userRepository.save(new Tester("a", "b", "c", "d"));
		assertThat(user.getActive()).isEqualTo(true);
		
		user = userService.disableAccount(user.getIdUser());
		assertThat(user.getActive()).isEqualTo(false);
	}
	
	public void enableAccount() {
		User user = new Tester("a", "b", "c", "d");
		user.setActive(false);
		user = userRepository.save(user);
		assertThat(user.getActive()).isEqualTo(false);
		
		user = userService.enableAccount(user.getIdUser());
		assertThat(user.getActive()).isEqualTo(true);
	}
	
	
	private UserForm createUserForm(String firstName, String lastName, String email, String password, String role) {
		UserForm form = new UserForm();
		form.setFirstName(firstName);
		form.setLastName(lastName);
		form.setEmail(email);
		form.setPassword(password);
		form.setRole(role);
		return form;
	}
	
	private void assertUserFields(String firstName, String lastName, String email, String password, String role,
			User user) {
		assertThat(user.getFirstName()).isEqualTo(firstName);
		assertThat(user.getLastName()).isEqualTo(lastName);
		assertThat(user.getEmail()).isEqualTo(email);
		assertThat(user.getPassword()).isEqualTo(password);
		assertThat(user.getRole()).isEqualTo(UserRole.valueOf(role));
	}
	
}
