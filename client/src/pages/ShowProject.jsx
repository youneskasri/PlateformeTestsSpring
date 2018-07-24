import React from 'react';
import Axios from 'axios';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Project from "../components/Project";
import Plan from "../components/Plan";
import NewPlan from "../components/NewPlan";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function retrieveTestPlansByProjectId(idProject){
	return Axios.get(`http://localhost:8080/projects/${idProject}/plans`)
		.then(response => response.data);
}

function retrieveTestPlan(idProject, idPlan){
	console.log("Requesst !!")
	return Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}`)
		.then(response => response.data);
}


function retrieveProjectById(id) {
  return  Axios.get('http://localhost:8080/projects/'+id)
		.then(response => response.data);
}

function deleteProjectById(id) {
	return  Axios.delete('http://localhost:8080/projects/'+id)
		.then(response => response.data);
}


class ShowProject extends React.Component {

	state = {
		project: {
			startDate: ''
		},
		testPlans: [],
		redirection: null,

		selectedPlanId: null
	}

	componentWillMount(){
		let { idProject, idPlan } = this.props.match.params;
		console.log(idPlan);
		this.setState({ selectedPlanId: idPlan });
	}

	componentDidMount(){
		let { idProject, idPlan } = this.props.match.params;

 		retrieveProjectById(idProject)
			.then(project => { console.log(project); return project; })
			.then(project => this.setState({ project }) );
		
		retrieveTestPlansByProjectId(idProject)
			.then(testPlans => { console.log(testPlans); return testPlans; })
			.then(testPlans => this.setState({ testPlans }));

		if (idPlan){
			this.setState({ selectedPlanId: idPlan });
		}

		console.log(this.state.project);	
	}

	handleDelete = (evt) => {
		evt.preventDefault();
		confirmAlert({
	      title: 'Confirmer la suppression',
	      message: 'Are you sure to do this.',
	        customUI: ({ onClose }) => {
			    return (
			      <div className="bg-light p-4 pt-1 border rounded">
			        <h1 className="text-info">Are you sure?</h1>
			        <hr/>
			        <p>You want to delete this file?</p>
			        <div className="btn-group ml-5 pr-3">
				        <button className="btn btn-info" onClick={onClose}>No, don't</button>
				        <button className="btn btn-danger" onClick={() => {
				            this.destroyProject()
				            onClose()
				        }}>Yes, Delete it!</button>
			        </div>
			      </div>
			    )
			  }
	    });
	}

	destroyProject = () => {
		deleteProjectById(this.state.project.idProject)
			.then(bool => console.log('deleted ?', bool))
			.then(()=> {
				let redirection = (
					<Redirect from={`this.props.match.path`} 
					to="/projects" />
				);
				this.setState({ redirection });
			})
			.catch(console.log);
	}

	render(){
		console.log("selectedPlanId", this.state.selectedPlanId);

		let project = this.state.project;

		let testPlans = this.state.testPlans.map(plan => (
			<li key={plan.idPlan} className="list-group-item">{/*<Link to={`${this.props.match.url}/plans/1`}>{plan}</Link>*/}
				<Link className="text-info" 
					to={`/projects/${project.idProject}/plans/${plan.idPlan}/cases`}>{ plan['title'] }</Link>
			</li>
		));

		


		let dynamicCanvas = (
			<Switch>
				<Route exact path="/projects/:idProject/plans/new" component={NewPlan} />
				<Route exact path="/projects/:idProject/plans/:idPlan(\d+)" component={this.state.Plan} />
			</Switch>
		); 

		console.log("Rendering ShowProject");
		return (
			<div className="container mt-5">
				{ this.state.redirection /* if necessary */}
				<div className="row">
					<div className="col-2">
						<h1 className="text-center text-info">Project</h1>
						<h2 className="text-center text-info">N° {project.idProject}</h2>
						<div className="text-center">
							<Link to={`/projects/${project.idProject}/edit`} className="text-secondary">Update</Link>
							<Link to="/" onClick={this.handleDelete} className="ml-1 text-danger">Delete</Link>
						</div>
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
	}
	
};


export default ShowProject;