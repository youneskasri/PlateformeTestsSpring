import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

import CKEditor from "react-ckeditor-component";

const BASE_URL = require("../params").serverBaseUrl;

export default class EditPlan  extends React.Component {
	
	state = {
		plan: {
			description: '<i>Click here to show and update the data.. </i>'
		}
	}	
	
	componentWillMount() {

		let { idProject, idPlan } = this.props.match.params;

		Axios.get(`${BASE_URL}/projects/${idProject}/plans/${idPlan}`)
		.then(res => res.data)
		.then(plan => {
			console.log("I made a request");
			this.setState({ plan });
		})
		.catch(console.log);
	}


	componentDidMount(){
		console.log("EditPlan mounted");
		console.log(this.state.plan);
		console.log("editor", this.refs.ckeditor);

		if ( ! this.refs.ckeditor.props.content) {
			this.setState({ refresh: this.state.refresh + 1 });
		}
	}
	
	handleDescriptionChange = (event) => {
		let description = event.editor.getData();
		console.log(description);

		let plan = this.state.plan;
		plan.description = description;
		this.setState({ plan });
	}

	onFocus = (event) => {
		event.editor.setData(this.state.plan.description);
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.state.plan.description;
		
		let { idPlan } = this.state.plan;
		let { idProject } = this.props.match.params;

		let url = `${BASE_URL}/projects/${idProject}/plans/${idPlan}`;

		Axios.post(url, { title, description })
		.then(res => res.data)
		.then(plan => {
			console.log("Updated ",plan);

			let redirection = (
				<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios`} />
			);
			this.setState({ redirection });
		})
		.catch(console.log);
	}

	render(){

		let { idPlan, title, description } = this.state.plan;
		let { idProject } = this.props.match.params;

		console.log(this.state.plan);

		return (
			<div className="container-fluid pt-4">
				<div className="row mt-3">
					<div className="col-md-6 offset-md-3">
						<div className="card">
							<div className="card-header container-fluid">
								<div className="row">
									<div className="col-10">
										<h3>Edit Plan N°{idProject}-{idPlan}</h3>
									</div>
									<div className="col-2">
										<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios`} className="btn btn-light text-info btn-block"><i className="fas fa-times"></i></Link>									
									</div>
								</div>
							</div>						

							<form className="container" onSubmit={this.handleSubmit}>
								{ this.state.redirection }
								<div className="pb-3 pt-4">
									<label>Plan title</label>
									<input required type="text" className="form-control" defaultValue={title} ref="title" />
								</div>
								<div className="pb-3">
									<label>Plan description</label>
										<CKEditor 
				            				ref="ckeditor"
				            				activeClass="p10" 
		        		      				content={ this.state.plan.description } 
		              						events={{
		              							"focus": this.onFocus,
		                						"change": this.handleDescriptionChange
              								}}
		             					/>
				            		
		             			</div>						
								<button className="btn btn-info btn-block mb-3">Save</button>		
							</form>
							
						</div>
					</div>
				</div>
			</div>			
		);
	}
}

