import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "../actions/axios";
import CKEditor from "react-ckeditor-component";

const BASE_URL = require("../params").serverBaseUrl;

export default class NewCase extends React.Component {

	state = {
		testCase: {
			steps: '<i>Click here to show and update the data.. </i>'
		},
		redirection: null,
		instructions: []
	}

	handleStepsChange = (event) => {
		let steps = event.editor.getData();
		let { testCase } = this.state;
		testCase.steps = steps;
		this.setState({ testCase });
	}

	onFocus = (event) => {
		event.editor.setData(this.state.testCase.steps);
	}

	toggleAutomated = (event) => {
		let automated = !this.state.testCase.automated;

		let testCase = Object.assign({ automated },this.state.testCase);
		this.setState({ testCase });
	}

	componentDidMount() {
		let { idProject, idPlan, idScenario, idCase } = this.props.match.params;
		Axios.get(`${BASE_URL}/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`)
			.then(res => res.data)
			.then(testCase => {
				this.setState({ testCase });
				this.refs.objective.value = testCase.objective;
				this.state.testCase.steps = testCase.steps;
				this.refs.inputs.value = testCase.inputs;
				this.refs.outputs.value = testCase.expectedOutputs;
			})
			.catch(err => alert(err.message));
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let automated = this.state.testCase.automated || false;
		let objective = this.refs.objective.value;

		if ( automated === true) {
			// TODO
			alert('TODO');
		} else {
			let steps = this.state.testCase.steps;
			let inputs = this.refs.inputs.value;
			let expectedOutputs = this.refs.outputs.value;

			let { idProject, idPlan, idScenario } = this.props.match.params;

			let idCase = this.state.testCase.idTestCase;

			console.log(automated, inputs, expectedOutputs, steps);

			Axios.post(`${BASE_URL}/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`, { objective, automated, inputs, expectedOutputs, steps } )
				.then(res => res.data)
				.then(res => {
					console.log(res);
					let redirection = (<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`} />);
					this.setState({ redirection });
				})
				.catch(err => { alert(err.message); console.log(err) });
		}
	}

	render(){

		let automatedTestForm = (
			<div className="form-inline mt-1">
			  <select ref="action" className="form-control">
			  	<option value="">Action</option>
			  </select>
			  <input type="text" ref="target" className="form-control" placeholder="#target"/>
			  <button onClick={this.addInstruction} className="btn btn-info">Add</button>
			</div>
		);

		let manualTestForm =  (
			<div>
				<label>Steps</label>
				<CKEditor 
    				activeClass="p10" 
      				content={this.state.testCase.steps} 
						events={{
						"change": this.handleStepsChange,
						"focus": this.onFocus
						}}
 				/>
				<div className="mb-3"></div>

				<div className="container-fluid">
					<div className="row p-0">
						<div className="col-6 p-0 pr-1">
							<label>Inputs</label>
							<textarea ref="inputs" className="form-control" placeholder="Inputs"></textarea>
						</div>
						<div className="col-6 p-0 pl-1">
							<label>Expected outputs</label>
							<textarea ref="outputs" className="form-control" placeholder="Expected Outputs" required></textarea>
						</div>
					</div>
				</div>
			</div>
		);

		let testCaseInputs = this.state.automated ?
			automatedTestForm : manualTestForm;

		let { idProject, idPlan, idScenario } = this.props.match.params;
		let idCase = this.state.testCase.idTestCase;

		return (
			<div className="container">
				{ this.state.redirection }
				<div className="row mt-5">
					<div className="col-10 offset-1">
						<div className="card">
							<h5 className="card-header">
								Edit Test Case 
								<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`}>
									<i className="fas fa-times"></i>
								</Link>
							</h5>
							<form className="card-body" onSubmit={this.handleSubmit}>
								<label>Objective</label>
								<input ref="objective" type="text" className="form-control" placeholder="Objectif du test"/>
								<div className="mb-3"></div>
								
								<label className="mr-2">Test Type </label> 
								<span className="text-info font-weight-bold">{ this.state.testCase.type}</span>
{/*								<label className="switch">
								  <input type="checkbox" checked={this.state.testCase.automated} onChange={this.toggleAutomated} />
								  <span className="slider round"></span>
								  _
								</label>*/}

								{ testCaseInputs }			

								<div className="mb-3"></div>
								<button className="btn mx-auto btn-block w-50">Save</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}