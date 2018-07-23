package ma.map.tm.web;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.map.tm.entities.Project;

@Data @AllArgsConstructor
@NoArgsConstructor
public class ProjectForm {
	
	private String title;
	private String description;
	private Date startDate;
	private Date endDate;
	
	public static Project extract(ProjectForm data) {
		Project p = new Project();
		p.setData(data);
		return p;
	}
}
