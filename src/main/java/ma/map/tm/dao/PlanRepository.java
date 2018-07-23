package ma.map.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long>{

//	@Query("SELECT p FROM Plan p WHERE p.project.idProject = :x")
//	List<Plan> findByIdProject(@Param("x") Long idProject);

}
