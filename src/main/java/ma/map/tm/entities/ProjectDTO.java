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
	private Date endDate;
	private String authorFullName;
	
	
	public static ProjectDTO convert(Project p) {
		// TODO NullPointerException ????
		String authorFullName = p.getAuthor() != null ? p.getAuthor().getFirstName() + 
				p.getAuthor().getLastName() : "Unknown Author";
		
		return new ProjectDTO(p.getIdProject(), p.getTitle(),
				p.getDescription(), p.getStartDate(), p.getEndDate(), authorFullName);
	}

}
