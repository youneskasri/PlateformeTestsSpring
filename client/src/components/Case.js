import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "../actions/axios";
import HtmlParser from 'html-react-parser';


export default class Case extends React.Component {  

 
	render () {

		let { testCase } = this.props;
		
		let { idProject , idPlan, idScenario, idCase } = this.props.match.params;
		let returnLink = `/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`; 

/*		let links = this.props.hideLinks ? '' : (		
							<div className="list-group"><Link className="text-info" to={`/projects/${idProject}/plans/${idPlan}/cases`}>
									Historique des executions
							</Link></div> );

		let showMore = this.props.hideLinks ? '' : (
					<div className="card-footer">
						<Link className="float-right text-info" to={`/projects/${idProject}/plans/${idPlan}/cases/${idCase}`}>
							Show more
						</Link>
					</div> );*/

		return (
			<div className="card">
				<h5 className="card-header"><small className="text-info font-weight-bold pr-2">Test Case Objective </small> {testCase.objective}
					<Link className="float-right text-info" to={returnLink} >
						<i className="fas fa-times"></i>
					</Link>
				</h5>
				<div className="card-body">				
					<div className="container-fluid">
						<div className="row">
							<div className="col-6">
								<h6 className="text-info">Inputs (Test Data)</h6>
								{ testCase.inputs }
							</div>
							<div className="col-6">
								<h6 className="text-info">Expected Outputs</h6>
								{ testCase.expectedOutputs }
							</div>
						</div>
						<hr/>
						<div className="row">
							<div className="col-6">
								<h6 className="text-info">Steps</h6>
								<div>
									{ HtmlParser(testCase.steps || '') }
								</div>
							</div>
							<div className="col-6">
								<h6 className="text-info">Test type</h6>
								<div>
									{ testCase.type }
								</div>
							</div>
							
						</div>
					</div>

				</div>
			</div>
		);
	}

}