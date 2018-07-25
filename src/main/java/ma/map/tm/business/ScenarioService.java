package ma.map.tm.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import ma.map.tm.dao.PlanRepository;
import ma.map.tm.dao.ScenarioRepository;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.PlanDTO;
import ma.map.tm.entities.Scenario;
import ma.map.tm.entities.ScenarioDTO;
import ma.map.tm.web.ScenarioForm;

@Service
public class ScenarioService implements IScenarioService {

	@Autowired
	private ScenarioRepository scenarioRepository;
	
	@Autowired
	private PlanRepository planRepository;
	
	@Override
	public List<ScenarioDTO> retrieveAllScenarios(Long idPlan) {
		
		Optional<Plan> opt = planRepository.findById(idPlan);
		Plan plan = opt.get();
		
		Scenario scenario = new Scenario();
		scenario.setPlan(plan);
		
		List<Scenario> scenarios = scenarioRepository.findAll(Example.of(scenario));
		
		List<ScenarioDTO> scenariosDTO = new ArrayList<>();
		scenarios.forEach(sc -> {
			scenariosDTO.add( ScenarioDTO.convert(sc));
		});
		
		return scenariosDTO;
	}

	@Override
	public ScenarioDTO createScenario(Long idPlan, ScenarioForm data) {
		
		Optional<Plan> opt = planRepository.findById(idPlan);
		Plan plan = opt.get();
		
		Scenario scenario = ScenarioForm.extract(data);
		scenario.setPlan(plan);
		
		scenario = scenarioRepository.save(scenario);
		return ScenarioDTO.convert(scenario);
	}

	@Override
	public ScenarioDTO retrieveScenarioById(Long idScenario) {
		Optional<Scenario> opt = scenarioRepository.findById(idScenario);
		return ScenarioDTO.convert(opt.get());
	}

	@Override
	public ScenarioDTO updateScenario(Long idScenario, ScenarioForm data) {
		Optional<Scenario> opt = scenarioRepository.findById(idScenario);
		Scenario scenario = opt.get();
		scenario.setData(data);
		
		scenario = scenarioRepository.save(scenario);
		return ScenarioDTO.convert(scenario);
	}

	@Override
	public Boolean removeScenarioById(Long idScenario) {
		if (scenarioRepository.existsById(idScenario)) {
			scenarioRepository.deleteById(idScenario);
			return true;
		}
		return false;
	}

}
