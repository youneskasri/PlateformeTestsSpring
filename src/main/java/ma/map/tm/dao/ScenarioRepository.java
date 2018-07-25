package ma.map.tm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.map.tm.entities.Scenario;

public interface ScenarioRepository extends JpaRepository<Scenario, Long>{

}
