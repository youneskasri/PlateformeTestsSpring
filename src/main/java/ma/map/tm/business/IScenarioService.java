package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.PlanDTO;

public interface IScenarioService {

	List<PlanDTO> retrieveAllScenarios(Long idPlan);

}
