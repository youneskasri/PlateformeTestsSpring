package ma.map.tm.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.Case;

public interface CaseRepository extends JpaRepository<Case, Long>{

}
