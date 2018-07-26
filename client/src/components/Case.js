import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";

/*
* TODO : I changed the previous Case class to Scenario
*/



export default class Case {  

	state = {
		testCase: {}
	}

	componentDidMount() {
		let { idProject , idPlan, idScenario, idCase } = this.props.match.params;
		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases/${idCase}`)
			.then(res => res.data)
			//.then(testCase => this.setState({ testCase }))
			.catch(err => alert(err.message));
	}

	render(){
	
		let props=  this.props;
		
		let { idProject , idPlan, idScenario, idCase } = props.match.params;
		let returnLink = `/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`; 

		let links = props.hideLinks ? '' : (		
							<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
									Historique des executions
							</Link></div> );

		let showMore = props.hideLinks ? '' : (
					<div className="card-footer">
						<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/cases/${idCase}`}>
							Show more
						</Link>
					</div> );

		return (
			<div className="card">
				<h5 className="card-header">Test Case Objective {}
					<Link className="float-right text-info" to={returnLink} >
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<div className="card-body">				
					<h4>Description </h4>
					<p>Lorem ipsum lorem ipsum</p> 
					{ links }
				</div>
				{ showMore }
			</div>
		);
	}

}