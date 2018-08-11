package ma.map.tm.entities.dto;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import ma.map.tm.entities.Plan;
import ma.map.tm.entities.Project;
import ma.map.tm.entities.TestExecution;

@Getter @Setter
public class ProjectReportDTO {
	
	private String projectTitle,
		projectDescription;
	
	/* Pie Chart Data */
	private int nbOfCasesOK = 0, 
		nbOfCasesNotOK = 0, 
		nbOfCasesNotExecuted = 0,
		nbOfCasesTotal = 0; /* pr vérifier la cohérence */
	
	private List<Plan> plans;
	
	
	public ProjectReportDTO(Project project) {
		
		this.setProjectTitle(project.getTitle());
		this.setProjectDescription(project.getDescription());
		this.setPlans(project.getTestPlans());		
		this.calculateCasesStats();
	}


	private void calculateCasesStats() {
		plans.forEach(plan -> {
			plan.getScenarios().forEach(scenario -> {
				nbOfCasesTotal += scenario.getTestCases().size();
				scenario.getTestCases().forEach(testCase -> {
					List<TestExecution> executions = testCase.getExecutions();
					if (executions.size() > 0) {
						
						if (isOrderedByDateDESC(executions) == false) {
							Collections.reverse(executions);
						}
						
						TestExecution mostRecentExecution = executions.get(0);
						if (mostRecentExecution.getStatus() == true) {
							nbOfCasesOK++;
						} else {
							nbOfCasesNotOK++;
						}
					} else {
						nbOfCasesNotExecuted++;
					}
				});
			});
		});
	}


	private Boolean isOrderedByDateDESC(List<TestExecution> executions) {

		TestExecution firstExecution = executions.get(0), 
				lastExecution = executions.get(executions.size()-1);
		
		Date firstDate = firstExecution.getDateOfExecution(),
				lastDate = lastExecution.getDateOfExecution();
		
		return firstDate.after(lastDate) ? true : false;
	}
}
