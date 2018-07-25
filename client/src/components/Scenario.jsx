import React from 'react';
import { Link } from 'react-router-dom';

const Scenario = (props) => {
	
	let { idProject , idPlan, idScenario } = props.match.params;

	let returnLink = `/projects/${idProject}/plans/${idPlan}/scenarios`; 

	let { scenario } = props;

    if (!scenario) return (<h5 className="font-weight-bold text-danger">No Scenario Passed In PROPS</h5>);

	let links = props.hideLinks ? '' : (		
						<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/scenarios`}>
								Historique des executions
						</Link></div> );

	let showMore = props.hideLinks ? '' : (
				<div className="card-footer">
					<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`}>
						Show more
					</Link>
				</div> );

	return (
		<div className="card">
			<h5 className="card-header"><small className="text-info font-weight-bold pr-2">Test Scenario Title </small> {scenario.title}
				<Link className="float-right text-info" to={returnLink} >
					<i className="fas fa-times"></i>
				</Link>
			</h5>
			<div className="card-body">				
				<p>
					<span className="font-weight-bold text-info pr-2">Test Scenario Description </span>
					{ scenario.description }
				</p> 
				{ links }
			</div>
			{ showMore }
		</div>
	);
}

export default Scenario;