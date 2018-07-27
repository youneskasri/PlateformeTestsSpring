import React from 'react';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Scenario from "../components/Scenario";
import Case from "../components/Case";
import NewCase from "../components/NewCase";
import Axios from "axios";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function deleteCaseById(idProject, idPlan, idScenario, idCase) {
	return  Axios.delete(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`)
		.then(response => response.data);
}

class ShowCase extends React.Component {

	state={
		testCase: {},
		executions: [],
		redirection: null,

		showExecuteForm: false
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
			        
			        <p>You want to delete this Scenario?</p>			        
			        <div className="btn-group ml-5 pr-3">
				        <button className="btn btn-info" onClick={onClose}>No, don't</button>
				        <button className="btn btn-danger" onClick={() => {
				            this.destroyCase()
				            onClose()
				        }}>Yes, Delete it!</button>
			        </div>
			      </div>
			    )
			  }
	    });
	}

	destroyCase = () => {
		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;

		deleteCaseById(idProject, idPlan, idScenario, idCase)
			.then(bool => console.log('deleted ?', bool))
			.then(()=> {
				let redirection = (
					<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`} />
				);
				this.setState({ redirection });
			})
			.catch(console.log);
	}


	showExecuteForm = (evt) => {
		evt.preventDefault();

		let showExecuteForm = true;
		this.setState({ showExecuteForm });
	}

	hideExecuteForm = (evt) => {
		evt.preventDefault();

		let showExecuteForm = false;
		this.setState({ showExecuteForm });
	}

	componentDidMount() {
		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;
		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`)
			.then(res => res.data)
			.then(testCase => this.setState({ testCase }));


		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}/history`)
			.then(res => res.data)
			.then(executions => this.setState({ executions }))
			.then(() => console.log(this.state.executions))
			.catch(err => alert(err.message));
	}



	render ()  {

		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;
		console.log(idProject, ' ', idPlan, ' ', idScenario, ' ', idCase);

		let { testCase } = this.state;

		let executions = this.state.executions.map(execution => 	(
			<li key={execution.idTestExecution} className="list-group-item">
				
				{/* TODO */}
				<Link onClick={(evt) => this.handleClickOnExecution()} className="text-info" >{ execution.dateOfExecution }</Link>
			</li>
		));

		let executeTestCase  = this.state.showExecuteForm  === true ? (
			<form action="">
				<button onClick={this.hideExecuteForm}>Close</button>
				<input type="text"/>
				<input type="text"/>
				<button>ok</button>
			</form>
		): '';
 
		return (
			<div className="container mt-5">
				{ this.state.redirection }
				<div className="row">
					<div className="col-2">
						<h3 className="text-center text-info">
						Test Case
						</h3>
						<h3 className="text-center text-info">
							N°{idProject}-{idPlan}-{idScenario}-{idCase}
						</h3>
						<div className="text-center">
							<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${testCase.idTestCase}/edit`} className="text-secondary">Update</Link>
							<Link to="/" onClick={this.handleDelete} className="ml-1 text-danger">Delete</Link>
						</div>
						<div className="text-center">
							<hr className="mb-0"/>
							<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`} className="text-info">Back to Scenario</Link>
						</div>
					</div>			
					<div className="col-10">
						<Case match={this.props.match} testCase={this.state.testCase} />
					</div>
				</div>
				<div className="mt-3"></div>
				<div className="row">
					<div className="col-md-6">
						<h4 className="card-header bg-lightBlue">
							History of executions
							<a href="#" onClick={this.showExecuteForm}   className="text-info float-right">
								<small><i className="fa fa-plus"></i> Execute Test Case</small>
							</a>
						</h4>
						<ul className="list-group list-group-flush">
							{ executions }
						</ul>					
					</div>
					<div className="col-md-6">
						{ executeTestCase }
					</div>
				</div>
			</div>
		);
	};

}

export default ShowCase;