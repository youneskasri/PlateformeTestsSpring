package ma.map.tm.entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectDTO {

	private Long idProject;
	private String title;
	private String description;
	private Date startDate;
	
	public static ProjectDTO convert(Project p) {
		return new ProjectDTO(p.getIdProject(), p.getTitle(),
				p.getDescription(), p.getStartDate());
	}

}
