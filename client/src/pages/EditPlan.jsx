import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


export default class EditPlan  extends React.Component {
	
	state = {
		plan: {}
	}	
	
	componentDidMount() {

		let { idProject, idPlan } = this.props.match.params;

		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}`)
		.then(res => res.data)
		.then(plan => {
			this.setState({ plan });
		})
		.catch(console.log);
	}


	handleDescriptionChange = () => {
		let description = this.refs.description.value;
		console.log(description);
		let { plan } = this.state;
		plan.description = description;
		this.setState({ plan });
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.refs.description.value;
		
		let { idPlan } = this.state.plan;
		let { idProject } = this.props.match.params;

		let url = `http://localhost:8080/projects/${idProject}/plans/${idPlan}`;

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
										<Link to="/projects" className="btn btn-light text-info btn-block"><i className="fas fa-times"></i></Link>									
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
									<textarea required className="form-control" cols="30" rows="5" ref="description" onChange={this.handleDescriptionChange} value={description}></textarea>
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

