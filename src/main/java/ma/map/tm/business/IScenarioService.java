package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.PlanDTO;
import ma.map.tm.entities.ScenarioDTO;
import ma.map.tm.web.ScenarioForm;

public interface IScenarioService {

	List<ScenarioDTO> retrieveAllScenarios(Long idPlan);

	ScenarioDTO createScenario(Long idPlan, ScenarioForm data);

	ScenarioDTO retrieveScenarioById(Long idScenario);

	ScenarioDTO updateScenario(Long idScenario, ScenarioForm data);

	Boolean removeScenarioById(Long idScenario);

}
