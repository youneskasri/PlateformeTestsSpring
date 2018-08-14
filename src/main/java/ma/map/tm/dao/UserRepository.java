package ma.map.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.users.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
