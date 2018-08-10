import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import HtmlParser from 'html-react-parser';

const BASE_URL = require("../params").serverBaseUrl;

function retrieveTestPlan(idProject, idPlan){
	console.log("Requesst !!")
	return Axios.get(`${BASE_URL}/projects/${idProject}/plans/${idPlan}`)
		.then(response => response.data);
}

class Plan extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		 
		let { idProject, idPlan   } = this.props.match.params;
 		
 		let { plan } = this.props;

 		if (!plan) return <div>No Plan Displayed</div>;

		let { url } = this.props.match;
		/*
			A Changer Plus Tard :/
		*/
		let returnLink = url.includes('cases') ? url.replace('/cases', '') : `/projects/${idProject}`; 
 
		let links = this.props.hideLinks ? '' : (
					<div>
						<div><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
							10 Test Scenarios
						</Link></div>		
						<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
								Historique des executions
						</Link></div>
					</div> );
 
		let showMore = this.props.hideLinks ? '' : (
					<div className="card-footer">
						<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
							Show more
						</Link>
					</div> );
 
		return  (
			<div className="card">
				<h5 className="card-header"><small className="text-info font-weight-bold pr-2">Test Plan Title </small> {plan.title }
					<Link className="float-right text-info" to={returnLink} >
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<div className="card-body">	
					<div>
						<span className="font-weight-bold text-info pr-2">Test Plan Description </span>		
						{ HtmlParser(plan.description || '') }
					</div> 
					{ links }
				</div>
				{ showMore }
			</div>
		);
	}

}

export default Plan; // withRouter(Plan);

