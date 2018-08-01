import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

import CKEditor from "react-ckeditor-component";

export default class EditScenario  extends React.Component {
	
	state = {
		scenario: {
			description: '<i>Click here to show and update the data.. </i>'
		}
	}	

	/* Todo */
	onFocus = (event) => {
		event.editor.setData(this.state.scenario.description);
	}
	
	componentDidMount() {

		let { idProject, idPlan, idScenario } = this.props.match.params;

		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}`)
		.then(res => res.data)
		.then(scenario => {
			this.setState({ scenario });
		})
		.catch(console.log);
	}


	handleDescriptionChange = (event) => {
		let description = event.editor.getData();
		let { scenario } = this.state;
		scenario.description = description;
		this.setState({ scenario });
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.state.scenario.description;
		
		let { idScenario } = this.state.scenario;
		let { idProject, idPlan } = this.props.match.params;

		let url = `http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}`;

		Axios.post(url, { title, description })
		.then(res => res.data)
		.then(scenario => {
			console.log("Updated ", scenario);

			let redirection = (
				<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`} />
			);
			this.setState({ redirection });
		})
		.catch(console.log);
	}

	render(){

		let { idScenario, title, description } = this.state.scenario;
		let { idProject, idPlan } = this.props.match.params;

		return (
			<div className="container-fluid pt-4">
				<div className="row mt-3">
					<div className="col-md-6 offset-md-3">
						<div className="card">
							<div className="card-header container-fluid">
								<div className="row">
									<div className="col-10">
										<h3>Edit Scenario N°{idProject}-{idPlan}-{idScenario}</h3>
									</div>
									<div className="col-2">
										<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`} className="btn btn-light text-info btn-block"><i className="fas fa-times"></i></Link>									
									</div>
								</div>
							</div>						

							<form className="container" onSubmit={this.handleSubmit}>
								{ this.state.redirection }
								<div className="pb-3 pt-4">
									<label>Test Scenario Title</label>
									<input required type="text" className="form-control" defaultValue={title} ref="title" />
								</div>
								<div className="pb-3">
									<label>Test Plan Description</label>
									<CKEditor 
				            				ref="ckeditor"
				            				activeClass="p10" 
		        		      				content={ description } 
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

