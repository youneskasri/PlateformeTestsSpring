import React from 'react';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Scenario from "../components/Scenario";
import Case from "../components/Case";
import NewCase from "../components/NewCase";
import Axios from "axios";
import Execution from "../components/Execution";

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

		displayedExecution: null,

		showExecuteForm: false,


		didItPass: false
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


	handleSaveExecution = () => {

		let status = this.state.didItPass;
		
		let outputs = this.refs.outputs.value;
		let remarks = this.refs.remarks.value;

		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;


		Axios.post(
			`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}/executions`,
			{ outputs, status, remarks}
			).then(res => res.data)
			.then(exec => alert(exec.outputs))
			.catch(err => alert(err));
	}

	componentDidMount() {
		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;
		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`)
			.then(res => res.data)
			.then(testCase => this.setState({ testCase }));


		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}/executions`)
			.then(res => res.data)
			.then(executions => this.setState({ executions }))
			.then(() => console.log(this.state.executions))
			.catch(err => alert(err.message));
	}


	typedOutputs = (evt) => {
		let outputs = evt.target.value;
		let { expectedOutputs } = this.state.testCase;

		if (outputs.trim() === expectedOutputs.trim()) {
			this.setState({ didItPass: true})
		} else {
			this.setState({ didItPass: false})
		}
	}

	toggleDidItPass = () => {
		let didItPass = ! this.state.didItPass;
		this.setState({ didItPass });
	}

	handleClickOnExecution = (idTestExecution) => {

		let execution = this.state.executions.filter(ex => ex.idTestExecution === idTestExecution)[0];

		console.log(execution);

		let displayedExecution = (
			<Execution execution={execution} />
		);

		this.setState({ showExecuteForm: false, displayedExecution });
	}

	render ()  {

		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;
		console.log(idProject, ' ', idPlan, ' ', idScenario, ' ', idCase);

		let { testCase } = this.state;

		let executions = this.state.executions.map(execution => 	(
			<li key={execution.idTestExecution} className="list-group-item">
				
				{/* TODO */}
				<a  href="#" onClick={() => this.handleClickOnExecution(execution.idTestExecution)} className="text-info" >{ execution.dateOfExecution }</a>
			</li>
		));

		let executeTestCase  = this.state.showExecuteForm  === true ? (
			<div className="card">
				<div className="card-header">
					Manual Test Case Execution <a className="float-right text-info" href="#" onClick={this.hideExecuteForm}><i className="far fa-times-circle"></i></a>
				</div>
				<div className="card-body">
					<form action="" className="container-fluid">
						<div className="row">
							<div className="col-12">
								<label>Outputs</label>
								<textarea ref="outputs" onChange={this.typedOutputs} rows="3" className="form-control"></textarea>
							</div>
						</div>
						<div className="row pt-2">
							<div className="col-10">
								<label>Did it pass ?</label>
								<label className="p-2">
									{
										this.state.didItPass ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>
									}
								</label>
								<label className="switch">
									  <input type="checkbox" checked={this.state.didItPass} onChange={this.toggleDidItPass} />
									  { 
									  	this.state.didItPass ? 
									  	<span className="slider round bg-success"></span>
									  	: <span className="slider round bg-danger"></span>									  	
									  }
									  _
								</label>
							</div>
						</div>
						<hr/>
						<div className="row">
							<div className="col-2">
								<label >Remarks</label>							
							</div>
							<div className="col-8">
								<input ref="remarks" type="text" className="form-control"/>
							</div>
							<div className="col-2">
								<button onClick={this.handleSaveExecution} className="btn btn-info btn-block">
									Save
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
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
						{ this.state.displayedExecution }
					</div>
				</div>
			</div>
		);
	};

}

export default ShowCase;