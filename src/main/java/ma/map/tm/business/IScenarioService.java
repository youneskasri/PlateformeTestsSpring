package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.dto.PlanDTO;
import ma.map.tm.entities.dto.ScenarioDTO;
import ma.map.tm.web.forms.ScenarioForm;

public interface IScenarioService {

	List<ScenarioDTO> retrieveAllScenarios(Long idPlan);

	ScenarioDTO createScenario(Long idPlan, ScenarioForm data);

	ScenarioDTO retrieveScenarioById(Long idScenario);

	ScenarioDTO updateScenario(Long idScenario, ScenarioForm data);

	Boolean removeScenarioById(Long idScenario);

}
