package ma.map.tm.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.forms.PlanForm;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Plan {
	
	private @Id @GeneratedValue Long idPlan;
	private String title;
	private String description;
	
	@JsonIgnore
	@ManyToOne
	private Project project;
	
	@OneToMany(cascade=CascadeType.ALL,mappedBy="plan")
	private List<Scenario> scenarios = new ArrayList<>();
	
	public Plan(String title, String description) {
		setTitle(title);
		setDescription(description);
	}

	public void setData(PlanForm data) {
		setTitle(data.getTitle());
		setDescription(data.getDescription());
	}
}
