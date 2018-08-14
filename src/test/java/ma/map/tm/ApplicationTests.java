package ma.map.tm;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ma.map.tm.dao.UserRepository;
import ma.map.tm.entities.users.Admin;
import ma.map.tm.entities.users.Architect;
import ma.map.tm.entities.users.Manager;
import ma.map.tm.entities.users.Tester;
import ma.map.tm.entities.users.User;
import ma.map.tm.entities.users.UserRole;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void contextLoads() {
		assertThat(userRepository).isNotNull();
	}

	@Test
	public void createManager() {
		String firstName = "Younes", lastName = "Kasri", 
				email="youneskasri@gmail.com", password="password";
		testSaveUser(firstName, lastName, email, password, UserRole.MANAGER, Manager.class);	
	}
	
	@Test
	public void createTester() {
		String firstName = "Younes", lastName = "Kasri", 
				email="youneskasri@gmail.com", password="password";
		testSaveUser(firstName, lastName, email, password, UserRole.TESTER, Tester.class);	
	}
	
	@Test
	public void createAdmin() {
		String firstName = "Younes", lastName = "Kasri", 
				email="youneskasri@gmail.com", password="password";
		testSaveUser(firstName, lastName, email, password, UserRole.ADMIN, Admin.class);
	}
	
	@Test
	public void createArchitect() {
		String firstName = "Younes", lastName = "Kasri", 
				email="youneskasri@gmail.com", password="password";
		testSaveUser(firstName, lastName, email, password, UserRole.ARCHITECT, Architect.class);	
	}
	
	
	private void testSaveUser(String firstName, String lastName, String email, String password, UserRole role, Class<? extends User> userClass) {
		
		User user = User.makeUser(firstName, lastName, email, password, role);
		user = userRepository.save(user);
		
		assertThat(user.getIdUser()).isNotNull();
		assertThat(user.getRole().toString()).isEqualTo(role.toString());
		assertThat(user.getFirstName()).isEqualTo(firstName);
		assertThat(user.getLastName()).isEqualTo(lastName);
		assertThat(user.getEmail()).isEqualTo(email);
		assertThat(user.getPassword()).isEqualTo(password);
		assertThat(user.getRole()).isEqualTo(role);
		
		assertThat(user.getActive()).isEqualTo(true);
		assertThat(user.getClass()).isEqualTo(userClass);
		
	}
	
}
