import React from 'react';

const Alert = (props) => {
	let style = {};
	style.color = props.success ? "green" : "red";
	return <span style={style}>{props.message}</span>
};

const ShowProject = (props) => {

	if (props.project) {
		let project = props.project;
		let alert = project.new ? <Alert success message="New Project Added" /> : '';
		return (
			<div className="card">
				<div className="card-header">
					Project N° {project.idProject} { alert }
				</div>
				<div className="card-body">
					<div><span className="font-weight-bold">Title</span> {project.title}</div>
					<div><span className="font-weight-bold">Description</span> {project.description}</div>
					<div><span className="font-weight-bold">Start Date</span> {project.startDate}</div>
				</div>
			</div>			
		);
	}
	
	return null;
};

export default ShowProject;