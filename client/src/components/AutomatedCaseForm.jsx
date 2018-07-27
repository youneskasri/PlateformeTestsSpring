import React from "react";


export default class AutomatedCaseForm extends React.Component {
	render() {
		return (
			<div className="form-inline mt-1">
			  <select name="" id="" className="form-control">
			  	<option value="">Action</option>
			  </select>
			  <input type="text" className="form-control" placeholder="#target"/>
			  <button type="submit" className="btn btn-info">Add</button>
			</div>
		);
	}
}