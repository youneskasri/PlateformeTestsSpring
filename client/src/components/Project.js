import React from 'react';
import { Link } from 'react-router-dom';

const Project = (props) => (
  <div className="card mb-3">
    <div className="card-header">
    	<div className="row">
    		<div className="col-11">{props.project.title} by {props.project.authorFullName} from 
          <span className="text-info"> {props.project.startDate} </span>
          to <span className="text-info">{props.project.endDate}</span>
        </div>
    		{
    			props.returnButton ? 
    			<div className="col-1">
    				<Link className="btn btn-light text-info float-right" to="/projects">
    					<i className="fas fa-times"></i>
    				</Link>
    			</div> 
    			: ''
    		}
    	</div>
    </div>
    <div className="card-body">
      {props.project.description}
      {
      	props.showLink ? <Link className="float-right" to={'/projects/'+props.project.idProject}> Show</Link> : ''
      }
    </div>
  </div>
); 

export default Project;