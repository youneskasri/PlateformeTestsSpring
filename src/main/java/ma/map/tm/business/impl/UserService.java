package ma.map.tm.business.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.map.tm.business.IUserService;
import ma.map.tm.dao.UserRepository;
import ma.map.tm.entities.users.User;
import ma.map.tm.entities.users.UserRole;
import ma.map.tm.web.forms.UserForm;

@Service
public class UserService implements IUserService {

	private UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public List<User> retrieveAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(UserForm form) {
		User user = User.makeUser(form);
		return user;
	}

	@Override
	public User retrieveUserById(Long idUser) {
		Optional<User> opt = userRepository.findById(idUser);
		return opt.get();
	}

	@Override
	public User updateUser(Long idUser, UserForm form) {
		User user = retrieveUserById(idUser);
		user.setFirstName(form.getFirstName());
		user.setLastName(form.getLastName());
		user.setRole(UserRole.valueOf(form.getRole()));
		return userRepository.save(user);
	}

	@Override
	public Boolean deleteUser(Long idUser) {
		if (userRepository.existsById(idUser)) {
			userRepository.deleteById(idUser);
			return true;
		}
		return false;
	}

	@Override
	public User disableAccount(Long idUser) {
		User user = retrieveUserById(idUser);
		user.setActive(false);
		return userRepository.save(user);
	}
	
	@Override
	public User enableAccount(Long idUser) {
		User user = retrieveUserById(idUser);
		user.setActive(true);
		return userRepository.save(user);
	}

}
