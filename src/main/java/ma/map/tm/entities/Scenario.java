package ma.map.tm.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.ScenarioForm;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor // For Tests
public class Scenario {

	private @Id @GeneratedValue Long idScenario;
	private String title;
	private String description;
	
	@ManyToOne
	private Plan plan;

	public void setData(ScenarioForm data) {
		setTitle(data.getTitle());
		setDescription(data.getDescription());
	}

}
