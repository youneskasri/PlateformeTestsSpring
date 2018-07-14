import React from 'react';

export default class NewProjectForm extends React.Component  {		



	constructor(props) {
	    super(props);
	   	this.state = {
			title: '',
			description: '',
			startDate: new Date()
		}
	}


	handleChangeTitle = (event) => {
		this.setState({title: event.target.value});
	}

	handleChangeDescription = (event) => {
		this.setState({description: event.target.value});
	};

	handleChangeStartDate = (event) => {
		this.setState({startDate: event.target.value});
	};

	render() {
		return (
			<form className="card" onSubmit={this.props.onSubmit}>

				<h4 className="card-header">Create a new Project</h4>
				<div className="card-body">
					<div className="form-group">
						<label>Title</label>
						<input onChange={this.handleChangeTitle} className="form-control" type="text" ref="titleInput" placeholder="Title" value={this.state.title} required />
					</div>
					<div className="form-group">
						<label>Description</label>
						<input onChange={this.handleChangeDescription} className="form-control" type="text" ref="descriptionInput" value={this.state.description} placeholder="Description" />
					</div>
					<div className="form-group">
						<label>Start Date</label>
						<input onChange={this.handleChangeStartDate} className="form-control" type="text" ref="startDateInput" value={this.state.startDate} />
					</div>
					<div>{this.state.refresh}</div>
					<button className="btn btn-block" type="submit">Ok</button>							
				</div>
			</form>			
		);
	}
};

