import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Plan from "../components/Plan";
import Case from "../components/Case";
import NewCase from "../components/NewCase";

function getTestCases(){
	return [
		{idCase: 1, title: 'Test Case 001', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 001 ' },
		{idCase: 2, title: 'Test Case 002', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 002 ' },
		{idCase: 3, title: 'Test Case 003', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 003 ' },
		{idCase: 4, title: 'Test Case 004', description: 'Mox dicta finierat, multitudo omnis ad, quae imperator voluit, promptior laudato 004 ' }
	];
}

const ShowPlan = (props) => {

	let { idProject, idPlan, idCase } = props.match.params;
	console.log(idProject, ' ', idPlan, ' ', idCase);

	let testCases = getTestCases().map(testCase => 	(
		<li key={testCase.idCase} className="list-group-item">
			<Link className="text-info" to={`${props.match.url}/${testCase.idCase}`}>{ testCase.title }</Link>
		</li>
	));

	let dynamicCanvas = (
		<Switch>
			
			<Route exact path={`${props.match.path}/new`} component={NewCase} />	
			<Route path={`${props.match.path}/:idCase`} component={Case} />
		
		</Switch>
	);

	console.log(props.match.path);

	console.log("Rendering ShowPlan");
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-2">
					<h4 className="text-center text-info">Project N°{idProject}
					</h4>
					<hr/>
					<h1 className="text-center text-info">
					Plan N°{idPlan}
					</h1>
				</div>			
				<div className="col-10">
					<Plan match={props.match} hideLinks/>
				</div>
			</div>
			<div className="mt-3"></div>
			<div className="row">
				<div className="col-md-6">
					<h4 className="card-header bg-lightBlue">
						Test Cases
						<Link to={`${props.match.url}/new`} className="text-info float-right">
							<small><i className="fa fa-plus"></i> Add a test Case</small>
						</Link>
					</h4>
					<ul className="list-group list-group-flush">
						{ testCases }
					</ul>					
				</div>
				<div className="col-md-6">
					{ dynamicCanvas }
				</div>
			</div>
		</div>
	);
};


export default ShowPlan;