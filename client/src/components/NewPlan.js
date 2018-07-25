import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

export default class NewPlan extends React.Component {

	state = {
		redirection: null
	}

	handleSubmit = (evt) =>{
		evt.preventDefault();
		let title = this.refs.title.value;
		let description = this.refs.title.value;
		let idProject = this.props.match.params.idProject;

		Axios.post(`http://localhost:8080/projects/${idProject}/plans`, {title, description})
			.then(res => res.data)
			.then(plan => {
				if(plan) {
					let redirection = ( <Redirect from={`this.props.match.path`} to={`/projects/${idProject}/plans/${plan.idPlan}/scenarios`} /> );
					this.setState({ redirection });
				}
			}).catch(console.log);
	}

	render() {

		let idProject = this.props.match.params.idProject;
		return (
			<div className="card">
				{ this.state.redirection }
				<h5 className="card-header">
					New Test Plan 
					<Link className="float-right text-info" to={`/projects/${idProject}`}>
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<form className="card-body" onSubmit={this.handleSubmit}>
					<input required ref="title" type="text" className="form-control" placeholder="Plan Title"/>
					<div className="mb-3"></div>
					<textarea ref="description" className="form-control" placeholder="Test plan description"></textarea>
					<div className="mb-3"></div>
					<button className="btn mx-auto btn-block w-50">Save</button>
				</form>
			</div>
		);	
	} 

} 
