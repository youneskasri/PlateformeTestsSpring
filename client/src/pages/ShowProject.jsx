import React from 'react';
import { Link, Switch, Route } from "react-router-dom";
import Project from "../components/Project";
import Plan from "../components/Plan";
import NewPlan from "../components/NewPlan";


function getTestPlans(){
	return [
		{idPlan: 1, title: 'Test Plan 001', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 001 ' },
		{idPlan: 2, title: 'Test Plan 002', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 002 ' },
		{idPlan: 3, title: 'Test Plan 003', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 003 ' },
		{idPlan: 4, title: 'Test Plan 004', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 004 ' }
	];
}

const ShowProject = (props) => {

	let project = {
		title: 'My Title',
		author: 'My Author',
		startDate: new Date(),
		description: 'Description',
		idProject: props.match.params.idProject
	};

	let testPlans = getTestPlans().map(plan => (
		<li key={plan.idPlan} className="list-group-item">{/*<Link to={`${props.match.url}/plans/1`}>{plan}</Link>*/}
			<Link className="text-info" to={`/projects/${project.idProject}/plans/${plan.idPlan}`}>{ plan.title }</Link>
		</li>
	));

	let dynamicCanvas = (
		<Switch>
			<Route exact path="/projects/:idProject/plans/new" component={NewPlan} />
			<Route exact path="/projects/:idProject/plans/:idPlan(\d+)" component={Plan} />
		</Switch>
	);

	console.log("Rendering ShowProject");
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-2">
					<h1 className="text-center text-info">Project</h1>
					<h2 className="text-center text-info">N° {project.idProject}</h2>
				</div>
				<div className="col-10">
					<Project project={project} returnButton />
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<h4 className="card-header bg-lightBlue">
						Test Plans
						<Link to={`/projects/${project.idProject}/plans/new`} className="text-info float-right">
							<small><i className="fa fa-plus"></i> Add a test plan</small>
						</Link>
					</h4>
					<ul className="list-group list-group-flush">
						{ testPlans }
					</ul>					
				</div>
				<div className="col-md-6">
					{dynamicCanvas}
				</div>
			</div>
		</div>
	);
};

export default ShowProject;