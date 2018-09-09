package ma.map.tm.jwt.token;


import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.map.tm.dao.UserRepository;
import ma.map.tm.entities.users.User;
import ma.map.tm.web.forms.LoginForm;

@RestController
@RequestMapping("/token")
@CrossOrigin(origins = "*")
public class TokenController {

	private UserRepository userRepository;
    private JwtGenerator jwtGenerator;
    
    @Autowired
    public TokenController(JwtGenerator jwtGenerator, UserRepository userRepository) {
        this.jwtGenerator = jwtGenerator;
        this.userRepository = userRepository;
    }

    @PostMapping
    public String generate(@RequestBody LoginForm form) {
    	
    	User user = new User();
    	user.setEmail(form.getEmail());
    	user.setPassword(form.getPassword());
    	
    	userRepository.findAll().forEach(System.out::println);
    	Optional<User> opt = userRepository.findOne(Example.of(user));
    	
    	try {
    		user = opt.get();
    	} catch(NoSuchElementException ex) {
    		return "Incorrect Username or Password";
    	}
    	
    	JwtUser jwtUser = new JwtUser(user);
        return jwtGenerator.generate(jwtUser)+","+user.getRole()+","+user.getFirstName();
    }
}