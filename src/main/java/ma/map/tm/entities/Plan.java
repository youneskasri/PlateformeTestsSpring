package ma.map.tm.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Plan {
	
	private @Id @GeneratedValue Long idPlan;
	private String description;
	
	@OneToMany
	private List<TestCase> testCases = new ArrayList<>();
	
	public Plan(String description) {
		setDescription(description);
	}
}
