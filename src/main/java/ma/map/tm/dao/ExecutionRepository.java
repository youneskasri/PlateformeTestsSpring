package ma.map.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.TestExecution;

public interface ExecutionRepository extends JpaRepository<TestExecution, Long>{

}
