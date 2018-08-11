package ma.map.tm.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.TestCase;

public interface CaseRepository extends JpaRepository<TestCase, Long>{

}
