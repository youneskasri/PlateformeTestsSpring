package ma.map.tm.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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

	@OneToMany(cascade=CascadeType.ALL)
	private List<Plan> testPlans = new ArrayList<>();
					
	public Project(String title, String description, Date startDate) {
		setTitle(title);
		setDescription(description);
		setStartDate(startDate);
	}
	
	public void setData(ProjectForm data) {
		setTitle(data.getTitle());
		setStartDate(data.getStartDate());
		setDescription(data.getDescription());
	}
	
	public void addTestPlan(Plan newTestPlan) {
		getTestPlans().add(newTestPlan);
	}
	
	public static Project extract(ProjectForm data) {
		Project p = new Project();
		p.setData(data);
		return p;
	}
	
}
