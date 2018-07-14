package ma.map.tm.web;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor
@NoArgsConstructor
public class ProjectForm {
	
	private String title;
	private String description;
	private Date startDate;
}
