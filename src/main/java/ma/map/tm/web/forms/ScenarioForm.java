package ma.map.tm.web.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.Scenario;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScenarioForm {
	
	private String title;
	private String description;
	
	public static Scenario extract(ScenarioForm data) {
		Scenario scenario = new Scenario();
		scenario.setData(data);
		return scenario;
	}

}
