package ma.map.tm.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import ma.map.tm.dao.PlanRepository;
import ma.map.tm.dao.ProjectRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.PlanDTO;
import ma.map.tm.entities.Project;
import ma.map.tm.web.PlanForm;

@Service
public class PlanService implements IPlanService {

	@Autowired
	private PlanRepository planRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Override
	public List<PlanDTO> retrieveAllPlans(Long idProject) {
		Optional<Project> opt = projectRepository.findById(idProject);
		Project project = opt.get();
		
		Plan plan = new Plan();
		plan.setProject(project);
		
		List<Plan> plans = planRepository.findAll(Example.of(plan));
		
		List<PlanDTO> plansDTO = new ArrayList<>();
		plans.forEach(p -> {
			plansDTO.add( PlanDTO.convert(p));
		});
		
		return plansDTO;
	}

	@Override
	public PlanDTO createPlan(Long idProject, PlanForm data) {
		Optional<Project> opt = projectRepository.findById(idProject);
		Project project = opt.get();
		
		Plan plan = PlanForm.extract(data);
		plan.setProject(project);
		
		plan = planRepository.save(plan);
		return PlanDTO.convert(plan);
	}

	@Override
	public PlanDTO retrievePlanById(Long id) {
		Plan plan = planRepository.findById(id).get(); 
		return PlanDTO.convert(plan);
	}

	@Override
	public Boolean removePlanById(Long id) {
		if (planRepository.existsById(id)) {
			planRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public PlanDTO updatePlan(Long idPlan, PlanForm data) {
		Optional<Plan> opt = planRepository.findById(idPlan);
		Plan plan = opt.get();
		plan.setData(data);
		
		plan = planRepository.save(plan);
		return PlanDTO.convert(plan);
	}

}
