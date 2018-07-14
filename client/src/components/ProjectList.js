import React from 'react';
import Project from "./Project";


const ProjectList = (props) => {
  
  let projects = props.projects.map(
  (project,i) => (
    <Project key={i} 
      project={project} 
      onDelete={() => props.onDelete(project.idProject)} 
      onShow={() => props.onShow(project.idProject)} />
  ));
  
  return (
      <div className="card">
        <div className="card-header">
          <h4>Project List</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>N°</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            { projects }
            </tbody>
          </table> 
        </div>         
      </div>
    );
} 




export default ProjectList;