package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.users.User;
import ma.map.tm.web.forms.UserForm;

public interface IUserService {

	List<User> retrieveAllUsers();
	User createUser(UserForm form);
	User retrieveUserById(Long idUser);
	
	/* TODO Should I update the email ?? */
	User updateUser(Long idUser, UserForm form);
	Boolean deleteUser(Long idUser);
	
	User disableAccount(Long idUser);
	User enableAccount(Long idUser);
}
