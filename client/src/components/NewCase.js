import React from 'react';
import { Link } from "react-router-dom";

export default class NewCase extends React.Component {

	state = {
		automated: true
	}

	toggleAutomated = (event) => {
		this.setState({ automated: !this.state.automated});
	}

	render(){

		const AutomatedTestData = (props) => (
			<div className="form-inline mt-1">
			  <select name="" id="" className="form-control">
			  	<option value="">Action</option>
			  </select>
			  <input type="text" className="form-control" placeholder="#target"/>
			  <button type="submit" className="btn btn-info">Add</button>
			</div>
		);

		const ManualTestData = (props) => (
			<div>
				<textarea className="form-control" placeholder="Etapes du test"></textarea>
				<div className="mb-3"></div>

				<div className="container-fluid">
					<div className="row p-0">
						<div className="col-6 p-0 pr-1">
							<textarea className="form-control" placeholder="Inputs"></textarea>
						</div>
						<div className="col-6 p-0 pl-1">
							<textarea className="form-control" placeholder="Expected Outputs"></textarea>
						</div>
					</div>
				</div>
			</div>
		);

		let testCaseInputs = this.state.automated ?
			<AutomatedTestData />: <ManualTestData />

		return (
			<div className="card">
				<h5 className="card-header">
					New Test Case
					<Link className="float-right text-info" to={`/projects/${this.props.match.params.idProject}/plans/${this.props.match.params.idPlan}/cases`}>
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<form className="card-body">
					<input type="text" className="form-control" placeholder="Objectif du test"/>
					<div className="mb-3"></div>
					
					<label className="mr-2">Automated ? </label> 
						<label className="switch">
						  <input type="checkbox" checked={this.state.automated} onChange={this.toggleAutomated} />
						  <span className="slider round"></span>
						  _
					</label>

					{ testCaseInputs }			

					<div className="mb-3"></div>
					<button className="btn mx-auto btn-block w-50">Save</button>
				</form>
			</div>
		);
	}
}
