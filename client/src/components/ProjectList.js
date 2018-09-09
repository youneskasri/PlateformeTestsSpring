import React from 'react';
import Project from "./Project";


class ProjectList extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    
    let projects = this.props.projects.map((project, i) => (
      <Project  key={i} project={project} showLink />
    ));

    return (
      <div>
      { projects }
      </div>
    );
  }
}

export default ProjectList;