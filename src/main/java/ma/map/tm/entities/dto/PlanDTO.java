package ma.map.tm.entities.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ma.map.tm.entities.Plan;

@Data
@Getter @Setter
public class PlanDTO {

	private Long idPlan;
	private String title;
	private String description;
	
	public static PlanDTO convert(Plan p) {
		PlanDTO dto = new PlanDTO();
		dto.setIdPlan(p.getIdPlan());
		dto.setTitle(p.getTitle());
		dto.setDescription(p.getDescription());
		return dto;
	}

}
