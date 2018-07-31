import React from 'react';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Plan from "../components/Plan";
import Scenario from "../components/Scenario";
import NewScenario from "../components/NewScenario";
import Axios from "axios";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function deletePlanById(idProject, idPlan) {
	return  Axios.delete(`http://localhost:8080/projects/${idProject}/plans/${idPlan}`)
		.then(response => response.data);
}

class ShowPlan extends React.Component {

	state={
		plan: {},
		scenarios: [],
		redirection: null
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
			        <p>You want to delete this Plan?</p>
			        <div className="btn-group ml-5 pr-3">
				        <button className="btn btn-info" onClick={onClose}>No, don't</button>
				        <button className="btn btn-danger" onClick={() => {
				            this.destroyPlan()
				            onClose()
				        }}>Yes, Delete it!</button>
			        </div>
			      </div>
			    )
			  }
	    });
	}

	destroyPlan = () => {
		let { idProject, idPlan } = this.props.match.params;

		deletePlanById(idPlan, this.state.plan.idPlan)
			.then(bool => console.log('deleted ?', bool))
			.then(()=> {
				let redirection = (
					<Redirect to={`/projects/${idProject}/`} />
				);
				this.setState({ redirection });
			})
			.catch(console.log);
	}

	componentDidMount() {
		let { idProject, idPlan, idScenario } = this.props.match.params;
		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/`)
			.then(res => res.data)
			.then(plan => this.setState({ plan }));

		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios`)
			.then(res => res.data)
			.then(scenarios => { console.log(scenarios); return scenarios; })
			.then(scenarios => this.setState({ scenarios }))
			.catch(console.log);
	}

	render ()  {

		let { idProject, idPlan, idScenario } = this.props.match.params;
		console.log(idProject, ' ', idPlan, ' ', idScenario);

		let plan = this.state.plan;

		let testScenarios = this.state.scenarios.map(testScenario => 	(
			<li key={testScenario.idScenario} className="list-group-item">
				<Link className="text-info" to={`${this.props.match.url}/${testScenario.idScenario}/cases`}>{ testScenario.title }</Link>
			</li>
		));

		/*
		* Tanchof mn ba3d ach ndir f'had Composant 3
		*/
		const NoMatch = (props) => (
			<div className="text-center pt-5 pb-3 text-info border ">
				<h5>
					<i className="fas fa-book-open fa-5x"></i>
				</h5>
				<hr/>
				<div className="btn-group">
					<div className="btn btn-outline-info">Btn 1</div>
					<div className="btn btn-outline-info">Btn 2</div>
					<div className="btn btn-outline-info">Btn 3</div>	
				</div>
			</div>
		);

		let dynamicCanvas = (
			<Switch>
				
				<Route path={`${this.props.match.path}/new`} component={NewScenario} />	
				<Route path={`${this.props.match.path}/:idScenario`} component={Scenario} />
				<Route component={NoMatch} />
			</Switch>
		);

		console.log(this.props.match.path);

		console.log("Rendering ShowPlan");
		return (
			<div className="container mt-5">
				{ this.state.redirection }
				<div className="row">
					<div className="col-2">
						<h1 className="text-center text-info">
						Plan N°{idProject}-{idPlan}
						</h1>
						<div className="text-center">
							<Link to={`/projects/${idProject}/plans/${idPlan}/edit`} className="text-secondary">Update</Link>
							<Link to="/" onClick={this.handleDelete} className="ml-1 text-danger">Delete</Link>
						</div>
						<div className="text-center">
							<hr className="mb-0"/>
							<Link to={`/projects/${idProject}`} className="text-info">Back to Project</Link>
						</div>
					</div>			
					<div className="col-10">
						<Plan match={this.props.match} plan={plan} hideLinks/>
					</div>
				</div>
				<div className="mt-3"></div>
				<div className="row">
					<div className="col-md-5">
						<h4 className="card-header bg-lightBlue">
							Test Scenarios
							<Link to={`${this.props.match.url}/new`} className="text-info float-right">
								<small><i className="fa fa-plus"></i> Add a test Scenario</small>
							</Link>
						</h4>
						<ul className="list-group list-group-flush">
							{ testScenarios }
						</ul>					
					</div>
					<div className="col-md-7">
						{ dynamicCanvas }
					</div>
				</div>
			</div>
		);
	};

}

export default ShowPlan;