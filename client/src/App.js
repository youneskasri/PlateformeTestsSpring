import React, { Component } from 'react';
import axios from "axios";

import ProjectList from "./components/ProjectList";
import NewProjectForm from "./components/NewProjectForm";
import ShowProject from "./components/ShowProject";

class App extends Component {
  
  state = {
    projects: [],
    currentProject: null
  }


  loadProjects = () => {
	  	axios.get(`http://localhost:8080/projects`)
	    .then(res => res.data)
	    //.then(data => data._embedded.projects)
	    .then(projects => {
	      this.setState({ projects });
	      console.log("setState done");
	      console.log(projects);
	    });
  }

  postProject = (title, description, startDate) => {
		axios.post(`http://localhost:8080/projects`, {title, description, startDate})
	    .then(res => res.data)
	    .then(project => {
	      let projects = this.state.projects.slice();
	      projects.push(project);
	      project.new = true;
	      this.setState({projects, currentProject: project});
	    })
	    .catch(console.log);
  }

  componentDidMount() {
    this.loadProjects();
    console.log("componentDidMount");
  } 

  handleSubmitProject = (event) => {

  		event.preventDefault();

  		let childForm = this.refs.form;
	  	let title = childForm.refs.titleInput.value;
	    let description = childForm.refs.descriptionInput.value;
	    let startDate = new Date(childForm.refs.startDateInput.value);
		
	    this.postProject(title, description, startDate);
	    childForm.setState({
	    	title: '',
	    	description: '',
	    	startDate: new Date()
	    });
  }

  handleDeleteProject = (id) => {
		axios.delete(`http://localhost:8080/projects/${id}`)
		.then(res => {
			let projects = this.state.projects.slice();
			projects = projects
				.filter(project => project.idProject !== id);
			this.setState({ projects, currentProject: null });
		})
		.catch(console.log); 
  }

  handleShowProject = (id) => { 
	  	axios.get(`http://localhost:8080/projects/${id}`)
		.then(res => res.data)
		.then(project => {
			console.log(project);
			this.setState({ currentProject: project });
		})
		.catch(console.log);
  }

  render() {
    return (
        <div className="container-fluid">
        	<div className="row">
        		<div className="col-6">
					<ProjectList projects={this.state.projects} 
						onDelete={this.handleDeleteProject}
						onShow={this.handleShowProject}
						/>
        		</div>
        		<div className="col-6">
			    	<NewProjectForm ref="form" onSubmit={this.handleSubmitProject}/>
			    	<ShowProject project={this.state.currentProject}/>
        		</div>
        	</div>	
          
          {/*<NewProject onSubmit={this.handleSubmitProject} project={newProject}/>*/}

        </div>
      );
  }
}

export default App;
