package ma.map.tm.business;

import java.util.List;

import ma.map.tm.entities.CaseDTO;
import ma.map.tm.web.CaseForm;

public interface ICaseService {

	List<CaseDTO> retrieveAllCases(Long idScenario);

	CaseDTO createCase(Long idScenario, CaseForm data);

	CaseDTO retrieveCaseById(Long idCase);

	CaseDTO updateCase(Long idCase, CaseForm data);

	Boolean removeCaseById(Long idCase);

}
