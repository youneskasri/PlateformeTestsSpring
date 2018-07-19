import React from 'react';
import { Link } from "react-router-dom";

function getTestPlans(){
	return [
		{idPlan: 1, title: 'Test Plan 001', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 001 ' },
		{idPlan: 2, title: 'Test Plan 002', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 002 ' },
		{idPlan: 3, title: 'Test Plan 003', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 003 ' },
		{idPlan: 4, title: 'Test Plan 004', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 004 ' }
	];
}

const Plan = (props) => {
	
	let { idProject , idPlan } = props.match.params;

	let url = props.match.url;

	let returnLink = url.includes('cases') ? url.replace('/cases', '') : `/projects/${idProject}`; 
	
	let plan = getTestPlans()
		.filter(p => p.idPlan == idPlan)[0];

	let links = props.hideLinks ? '' : (
					<div>
						<div><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
							10 Test Scenarios
						</Link></div>		
						<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
								Historique des executions
						</Link></div>
					</div> );

	let showMore = props.hideLinks ? '' : (
				<div className="card-footer">
					<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
						Show more
					</Link>
				</div> );

	return (
		<div className="card">
			<h5 className="card-header">Title : {plan.title}
				<Link className="float-right text-info" to={returnLink} >
					<i className="fas fa-times"></i>
				</Link>
			</h5>
			<div className="card-body">				
				<h4>Description </h4>
				<p>{plan.description}</p> 
				{ links }
			</div>
			{ showMore }
		</div>
	);
}

export default Plan;