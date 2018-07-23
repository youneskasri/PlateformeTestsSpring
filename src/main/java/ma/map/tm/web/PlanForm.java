package ma.map.tm.web;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;

@Data
@Getter @Setter
public class PlanForm {

	private String title;
	private String description;
	
	public static Plan extract(PlanForm data) {
		Plan plan = new Plan();
		plan.setData(data);
		return plan;
	}

	/* For Tests Only */
	public PlanForm(Plan plan) {
		setTitle(plan.getTitle());
		setDescription(plan.getDescription());
	}

}
