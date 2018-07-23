package ma.map.tm.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
	private Date endDate;

	@OneToMany(cascade=CascadeType.ALL, mappedBy="project")
	private List<Plan> testPlans = new ArrayList<>();
	
	@ManyToOne
	private Tester author;
	
	public Project(String title, String description, Date startDate, Date endDate) {
		setTitle(title);
		setDescription(description);
		setStartDate(startDate);
		setEndDate(endDate);
	}
	
	public void setData(ProjectForm data) {
		setTitle(data.getTitle());
		setStartDate(data.getStartDate());
		setEndDate(data.getEndDate());
		setDescription(data.getDescription());
	}
	
	public void addTestPlan(Plan newTestPlan) {
		getTestPlans().add(newTestPlan);
		newTestPlan.setProject(this);
	}	
	
}
