import React from 'react';
import { Link } from 'react-router-dom';

const Case = (props) => {
	
	let { idProject , idPlan, idCase } = props.match.params;

	let returnLink = `/projects/${idProject}/plans/${idPlan}/cases`; 

	let links = props.hideLinks ? '' : (		
						<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
								Historique des executions
						</Link></div> );

	let showMore = props.hideLinks ? '' : (
				<div className="card-footer">
					<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/cases/${idCase}`}>
						Show more
					</Link>
				</div> );

	return (
		<div className="card">
			<h5 className="card-header">Test Case : {idCase}
				<Link className="float-right text-info" to={returnLink} >
					<i className="fas fa-times"></i>
				</Link>
			</h5>
			<div className="card-body">				
				<h4>Description </h4>
				<p>Lorem ipsum lorem ipsum</p> 
				{ links }
			</div>
			{ showMore }
		</div>
	);
}

export default Case;