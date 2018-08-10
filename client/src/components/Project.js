import React from 'react';
import { Link } from 'react-router-dom';
import HtmlParser from 'html-react-parser';

const Project = (props) => (
  <div className="card mb-3">
    <div className="card-header">
    	<div className="row">
    		<div className="col-11">
          <Link className="text-info" to={'/projects/'+props.project.idProject}>
            {props.project.title}
          </Link> by {props.project.authorFullName} from 
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
      { HtmlParser(props.project.description || '') }
      <div className="float-right">        
        {
          props.showLink ? <Link to={'/projects/'+props.project.idProject}> Show</Link> 
          : <Link to={'/projects/'+props.project.idProject+'/report'}>Generate Report</Link>
        }
      </div>
    </div>
  </div>
); 

export default Project;