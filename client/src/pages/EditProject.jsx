import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import CKEditor from "react-ckeditor-component";

export default class EditProject  extends React.Component {
	state = {
		project: {
			startDate: moment(),
			endDate: moment(),
			description: '<i>Click here to show and update the data.. </i>'
		}
	}	

	onFocus = (event) => {
		event.editor.setData(this.state.project.description);
	}

	componentWillMount() {

		Axios.get('http://localhost:8080/projects/'+this.props.match.params.idProject)
		.then(res => res.data)
		.then(project => {
			this.setState({ project });
		})
		.catch(console.log);
	}

	handleStartDateChange = (startDate) => {
		let project = this.state.project;
		project.startDate = startDate;
		this.setState({ project });
	}

	handleEndDateChange = (endDate) => {
		let project = this.state.project;
		project.endDate = endDate;
		this.setState({ project });
	}

	handleDescriptionChange = (event) => {
		let description = event.editor.getData();
		console.log(description);
		let project = this.state.project;
		project.description = description;
		console.log(project);
		this.setState({ project });
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.state.project.description;
		
		let { idProject, startDate, endDate } = this.state.project;

		let url = 'http://localhost:8080/projects/'+idProject;

		console.log("sending request to ", url, { title, description, startDate, endDate });

		Axios.post(url, { title, description, startDate, endDate })
		.then(res => res.data)
		.then(project => {
			console.log(project);

			let redirection = (
				<Redirect from={`this.props.match.path`} to={`/projects/${project.idProject}`} />
			);
			this.setState({project, redirection});
		})
		.catch(console.log);
	}

	render(){

		let { startDate, endDate, title, description } = this.state.project;
		return (
			<div className="container-fluid pt-4">
				<div className="row mt-3">
					<div className="col-md-6 offset-md-3">
						<div className="card">
							<div className="card-header container-fluid">
								<div className="row">
									<div className="col-10">
										<h3>Project Title</h3>
									</div>
									<div className="col-2">
										<Link to="/projects" className="btn btn-light text-info btn-block"><i className="fas fa-times"></i></Link>									
									</div>
								</div>
							</div>						

							<form className="container" onSubmit={this.handleSubmit}>
								{ this.state.redirection }
								<div className="pb-3 pt-4">
									<input required type="text" className="form-control" defaultValue={title} ref="title" />
								</div>
								<div className="pb-3">
				            		<CKEditor 
				            				activeClass="p10" 
		        		      				content={this.state.project.description} 
		              						events={{
		                						"change": this.handleDescriptionChange,
		                						"focus": this.onFocus
              								}}
		             				/>									

								</div>
								<div className="pb-3 input-group">
									<label className="form-control bg-light"> Start Date </label>
									<DatePicker
										className="form-control"
								        selected={startDate? moment(startDate) : moment(0)}
								        onChange={this.handleStartDateChange}
								    />
								</div>
								<div className="pb-3 input-group">
									<label className="form-control bg-light"> End Date </label>
									<DatePicker
										className="form-control"
								        selected={endDate? moment(endDate) : moment(0)}
								        onChange={this.handleEndDateChange}
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

