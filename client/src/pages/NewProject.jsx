import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from '../actions/axios';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import CKEditor from "react-ckeditor-component";

const formatDate = require("../format-date"); // To set LANG = FR for moment()

const BASE_URL = require("../params").serverBaseUrl;

export default class NewProject  extends React.Component {
	state = {
		startDate: moment(),
		endDate: moment(),
		description: null,
		redirection: null
	}	

	handleDescriptionChange =  ( event ) =>  {
		let description = event.editor.getData();
		this.setState({ description });
	}

	handleStartDateChange = (startDate) => {
		this.setState({ startDate });
	}

	handleEndDateChange = (endDate) => {
		this.setState({ endDate });
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		let title = this.refs.title.value;
		let description = this.state.description;
		let startDate = this.state.startDate;
		let endDate = this.state.endDate;

		Axios.post(`${BASE_URL}/projects`, { title, description, startDate, endDate })
		.then(res => res.data)
		.then(project => {
			let redirection = (
				<Redirect from={`this.props.match.path`} to={`/projects/${project.idProject}`} />
			);
			this.setState({ redirection });
		})
		.catch(console.log);
	}

	render(){
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
									<input required type="text" className="form-control" placeholder="Project title" ref="title" />
								</div>
										<div className="pb-3">
				            		<CKEditor 
				            				activeClass="p10" 
		        		      				content={this.state.description} 
		              						events={{
		                						"change": this.handleDescriptionChange
              								}}
		             				/>
								</div>
								<div className="pb-3 input-group">
									<label className="form-control bg-light"> Start Date </label>
									<DatePicker
										className="form-control"
								        selected={this.state.startDate}
								        onChange={this.handleStartDateChange}
								    />
								</div>
								<div className="pb-3 input-group">
									<label className="form-control bg-light"> End Date </label>
									<DatePicker
										className="form-control"
								        selected={this.state.endDate}
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

