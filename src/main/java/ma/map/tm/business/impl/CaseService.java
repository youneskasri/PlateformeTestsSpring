package ma.map.tm.business.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import ma.map.tm.business.ICaseService;
import ma.map.tm.dao.CaseRepository;
import ma.map.tm.dao.ScenarioRepository;
import ma.map.tm.entities.Case;
import ma.map.tm.entities.Scenario;
import ma.map.tm.entities.dto.CaseDTO;
import ma.map.tm.web.forms.CaseForm;


@Service
public class CaseService implements ICaseService {

	@Autowired
	private CaseRepository caseRepository;
	
	@Autowired
	private ScenarioRepository scenarioRepository;
	
	@Override
	public List<CaseDTO> retrieveAllCases(Long idScenario) {
		Optional<Scenario> opt = scenarioRepository.findById(idScenario);
		Scenario scenario = opt.get();
		
		Case testCase = new Case();
		testCase.setScenario(scenario);
		
		//Sort sortByDateDesc = new Sort(Sort.Direction.DESC, "dateOfCreation");
		List<Case> cases = caseRepository.findAll(Example.of(testCase));
		
		final List<CaseDTO> casesDTO = new ArrayList<>();
		cases.forEach(c -> {
			casesDTO.add( CaseDTO.convert(c));
		});
		
		return casesDTO;
	}

	@Override
	public CaseDTO createCase(Long idScenario, CaseForm data) {
		Optional<Scenario> opt = scenarioRepository.findById(idScenario);
		Scenario scenario = opt.get();
		
		Case testCase = CaseForm.extract(data);
		testCase.setScenario(scenario);
		
		testCase = caseRepository.save(testCase);
		return CaseDTO.convert(testCase);
	}

	@Override
	public CaseDTO retrieveCaseById(Long idCase) {
		Optional<Case> opt = caseRepository.findById(idCase);
		return CaseDTO.convert(opt.get());
	}

	@Override
	public CaseDTO updateCase(Long idCase, @RequestBody CaseForm data) {
		Optional<Case> opt = caseRepository.findById(idCase);
		Case testCase = opt.get();
		testCase.setData(data);
		
		testCase = caseRepository.save(testCase);
		return CaseDTO.convert(testCase);		
	}

	@Override
	public Boolean removeCaseById(Long idCase) {
		if (caseRepository.existsById(idCase)) {
			caseRepository.deleteById(idCase);
			return true;
		}
		return false;
	}

}
