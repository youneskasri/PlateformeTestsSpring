package ma.map.tm.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import ma.map.tm.entities.Scenario;

@Data
@AllArgsConstructor
public class ScenarioForm {
	
	private String title;
	private String description;
	
	public static Scenario extract(ScenarioForm data) {
		Scenario scenario = new Scenario();
		scenario.setData(data);
		return scenario;
	}

}
