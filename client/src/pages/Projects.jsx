import React from 'react';
import axios from 'axios';
import { Link } from   'react-router-dom';
import Project from "../components/Project";
import ProjectList from "../components/ProjectList";

function retrieveAllProjects() {

  return  axios.get('http://localhost:8080/projects')
		.then(response => response.data)
}

export default class Projects extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		projects: []
	}


	componentDidMount(){
		retrieveAllProjects()
			.then(projects => this.setState({ projects }) );		
	}


	filterByKeywords = (event) => {

		let keywords = event.target.value;

		retrieveAllProjects()
			.then(projects => projects.filter(p => p.title.includes(keywords)) )
			.then(filteredProjects => this.setState({ projects: filteredProjects }) )
	  		.catch(console.log);
	}

	render() {
	
		let projects = this.state.projects;

		return (
			<div className="container w-75 bg-light pt-5">
				<div className="container">	
					<div className="row mb-4">
						<div className="col-2">
							<Link to="/projects/new" className="btn btn-info btn-block">
								<i className="fas fa-plus"> New project</i>
							</Link>
						</div>
						<div className="col-10">
							<input type="text" className="form-control" onChange={this.filterByKeywords} />
						</div>
					</div>
					<ProjectList projects={this.state.projects} />
				</div>
			</div>
		);	
	}
}



		