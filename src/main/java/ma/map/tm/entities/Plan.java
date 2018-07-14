package ma.map.tm.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Plan {
	
	private @Id @GeneratedValue Long idPlan;
	private String description;
	

	public Plan(String description) {
		setDescription(description);
	}
}
