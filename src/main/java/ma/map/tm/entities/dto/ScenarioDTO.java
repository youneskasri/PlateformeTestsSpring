package ma.map.tm.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import ma.map.tm.entities.Scenario;

@Data
@AllArgsConstructor
public class ScenarioDTO {

	private Long idScenario;
	private String title;
	private String description;
	
	public static ScenarioDTO convert(Scenario sc) {
		return new ScenarioDTO(
				sc.getIdScenario(), 
				sc.getTitle(), 
				sc.getDescription());
	}

}
