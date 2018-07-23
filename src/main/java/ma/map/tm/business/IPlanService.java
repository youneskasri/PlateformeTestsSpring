package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.PlanDTO;
import ma.map.tm.entities.ProjectDTO;
import ma.map.tm.web.PlanForm;

public interface IPlanService {

	List<PlanDTO> retrieveAllPlans(Long idProject);

	PlanDTO createPlan(Long idProject, PlanForm data);

	PlanDTO retrievePlanById(Long id);

	Boolean removePlanById(Long id);

	PlanDTO updatePlan(Long idPlan, PlanForm data);
}
