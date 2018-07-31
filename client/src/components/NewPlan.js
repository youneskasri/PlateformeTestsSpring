import React from 'react';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";


import CKEditor from "react-ckeditor-component";

export default class NewPlan extends React.Component {

	state = {
		redirection: null,
		description: '<i>Test Plan description ...</i>'
	}

	handleSubmit = (evt) =>{
		evt.preventDefault();
		let title = this.refs.title.value;
		let description = this.state.description;
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


	handleDescriptionChange =  ( event ) =>  {
		let description = event.editor.getData();
		this.setState({ description });
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
			    		<CKEditor 
		     				activeClass="p10" 
		       				content={this.state.description} 
	    					events={{
		           				"change": this.handleDescriptionChange
              				}}
             			/>
					<div className="mb-3"></div>
					<button className="btn mx-auto btn-info btn-block w-50">Save</button>
				</form>
			</div>
		);	
	} 

} 
