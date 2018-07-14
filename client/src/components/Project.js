import React from 'react';

const Project = (props) => (
      <tr>
      	<td>{props.project.idProject}</td>
        <td>{props.project.title}</td>
        <td>{props.project.description}</td>
        <td>{props.project.startDate}</td>
        <td>
        	<a href="#" onClick={props.onShow}>Show</a>
          -
          <a href="#" onClick={props.onDelete}>Delete</a>
        </td>
      </tr>
  );

export default Project;