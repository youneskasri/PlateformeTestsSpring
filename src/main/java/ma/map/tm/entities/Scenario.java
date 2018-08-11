package ma.map.tm.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.forms.ScenarioForm;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor // For Tests
public class Scenario {

	private @Id @GeneratedValue Long idScenario;
	private @NotBlank String title;
	
	@Column(columnDefinition="TEXT")
	private String description;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="scenario")
	private List<TestCase> testCases = new ArrayList<>();
	
	@JsonIgnore
	@ManyToOne
	private Plan plan;

	public void setData(ScenarioForm data) {
		setTitle(data.getTitle());
		setDescription(data.getDescription());
	}

}
