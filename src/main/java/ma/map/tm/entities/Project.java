package ma.map.tm.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.map.tm.web.ProjectForm;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Project {
	
	private @Id @GeneratedValue Long idProject;
	private String title;
	private String description;
	private Date startDate;

	@ManyToOne(cascade=CascadeType.ALL)
	private Plan plan;
	
	public Project(String description, Date startDate) {
		setDescription(description);
		setStartDate(startDate);
	}
	
	public void setData(ProjectForm data) {
		setTitle(data.getTitle());
		setStartDate(data.getStartDate());
		setDescription(data.getDescription());
	}

	public static Project extract(ProjectForm data) {
		Project p = new Project();
		p.setData(data);
		return p;
	}
	
}
