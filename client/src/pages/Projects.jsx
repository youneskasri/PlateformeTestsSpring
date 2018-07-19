import React from 'react';
import { Link } from   'react-router-dom';
import Project from "../components/Project";
import ProjectList from "../components/ProjectList";

function getDataFromServer() {

	console.log("J'ai lancé une requete !!");

	return [
			{idProject: 1, title: 'Project 001', description:'Lorem Ipsum 00 00 00 00', author: 'Younes Kasri', startDate: new Date()},
			{idProject: 2, title: 'Project 002', description:'Lorem Ipsum 00 00 00 00', author: 'Younes Kasri', startDate: new Date()},
			{idProject: 3, title: 'Project 003', description:'Lorem Ipsum 00 00 00 00', author: 'Younes Kasri', startDate: new Date()},
			{idProject: 4, title: 'Project 004', description:'Lorem Ipsum 00 00 00 00', author: 'Younes Kasri', startDate: new Date()}
		];
}



export default class Projects extends React.Component{

	constructor(props) {
		super(props);
	}

	state = {
		projects: []
	}


	componentDidMount(){
		let projects = getDataFromServer();
		this.setState({ projects: projects });		
	}

	filterByKeywords = (event) => {

		let keywords = event.target.value;

		let projects = getDataFromServer();
		let filteredProjects = projects.filter(p => p.title.includes(keywords));
		console.log(filteredProjects);

		this.setState({ projects: filteredProjects });
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



		