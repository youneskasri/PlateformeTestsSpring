import React from 'react';
import { Link } from "react-router-dom";
import Axios from "../actions/axios";
import moment from "moment";
import HtmlParser from 'html-react-parser';

const PieChart = require("react-chartjs").Pie;
const formatDate = require("../format-date");

const BASE_URL = require("../params").serverBaseUrl;
const CASE_OK_COLOR = "#46BFBD";
const CASE_NOT_OK_COLOR = "#F7464A";
const CASE_NOT_EXECUTED_COLOR = "#FDB45C";


const ExecutionRow = (props) => (
	<tr>
	  	<td>{props.execution.idTestExecution}</td>
	    <td>{ formatDate(props.execution.dateOfExecution, 'Do MMM YYYY à HH:mm:s')}</td>
	    <td>{props.expectedOutputs}</td>
	    <td>{props.execution.outputs}</td>		
	    { 
	    	props.execution.status === true ? 
	    	(<td><span className="text-success font-weight-bold">OK</span></td>)
	    	: (<td><span className="text-danger font-weight-bold">NOT OK</span></td>)
	    }	        
	    
	</tr>
);

class ListExecutions extends React.Component {

	render() {

		let { executions, expectedOutputs } = this.props.testCase;
		return (
		  <table className="table table-hover table-sm">
		    <thead>
		      <tr>
		        <th>Execution N°</th>
		        <th>Date</th>
		        <th>Resultat Attendu</th>
		        <th>Resultat Obtenu</th>
		        <th>Valide ?</th>
		      </tr>
		    </thead>
		    <tbody>
		      {
		      	executions.map(execution => <ExecutionRow key={execution.idTestExecution} expectedOutputs={expectedOutputs} execution={execution} />)
		      }	      
		    </tbody>
		  </table>
		);
	}
}

class CasTest extends React.Component {

	state={
		closed: true
	}

	toggleClosed = (event) => {

		event.preventDefault();
		let closed = !this.state.closed;
		this.setState({ closed });
	}

	render() {

		let { testCase } = this.props;

		let plusButton = <button onClick={this.toggleClosed} className="btn btn-sm btn-light"><i className="fas fa-plus text-info"></i></button>,
			minusButton = <button onClick={this.toggleClosed} className="btn btn-sm btn-light"><i className="fas fa-minus text-info"></i></button>;

		let openCloseButton = this.state.closed ? plusButton : minusButton;


		let content = this.state.closed ? '' 
		: 	(	
				<div className="container-fluid">
					<div className="row mb-4">
						<div className="col-4 border-right">
							<h6><u>Etapes du test</u></h6>	
							{
								HtmlParser(testCase.steps || '')
							}
						</div>	
						<div className="col-4 border-right">
							<h6><u>Inputs</u></h6>
							<p>{ testCase.inputs }</p>
						</div>
						<div className="col-4">
							<h6><u>Expected Outputs</u></h6>
							<p>{ testCase.expectedOutputs }</p>
						</div>
					</div>
					<ListExecutions testCase={testCase} />
				</div>
			);

		let caseStatus;
		if (testCase.executions.length === 0) {
			caseStatus = <span style={{ color: CASE_NOT_EXECUTED_COLOR }} className="pl-2"> <i className="fas fa-minus"></i> Not Executed</span>
		} else {
			if (testCase.executions[0].status === true) {
				caseStatus = <span style={{ color: CASE_OK_COLOR }} className="pl-2"> <i className="fas fa-check"></i> OK</span>
			} else {
				caseStatus = <span style={{ color: CASE_NOT_OK_COLOR }} className="pl-2"> <i className="fas fa-times"></i> NOT OK</span>
			}
		}

		return ( 
			<div className="ml-5 mb-4">
				<h5>{openCloseButton} Cas de Test : <span className="text-info">{ testCase.objective }</span>
					{caseStatus}
				</h5>
				{ content }
			</div>

		);

	}
}

class ScenarioTest extends React.Component {
	state={
		closed: true
	}

	toggleClosed = (event) => {

		event.preventDefault();
		let closed = !this.state.closed;
		this.setState({ closed });
	}

	render() {
		let  { scenario } = this.props;

		let plusButton = <button onClick={this.toggleClosed} className="btn btn-sm btn-light"><i className="fas fa-plus text-info"></i></button>,
			minusButton = <button onClick={this.toggleClosed} className="btn btn-sm btn-light"><i className="fas fa-minus text-info"></i></button>;

		let openCloseButton = this.state.closed ? plusButton : minusButton;

		let content = this.state.closed ? '' 
		: (
			<div>				
				{
					scenario.testCases.map(testCase => <CasTest key={testCase.idTestCase} testCase = { testCase } />)
				}
			</div>
		);

		return (
			<ul>
				<h4>{openCloseButton} Scenario De Test : <span className="text-info">{ scenario.title }</span></h4>
				{ content }
			</ul>
		);
	}

}

class PlanTest extends React.Component {
	state={
		closed: true
	}

	toggleClosed = (event) => {

		event.preventDefault();
		let closed = !this.state.closed;
		this.setState({ closed });
	}

	render() {
		let { plan } = this.props;

		let plusButton = <button onClick={this.toggleClosed} className="btn  btn-light"><i className="fas fa-plus text-info"></i></button>,
			minusButton = <button onClick={this.toggleClosed} className="btn  btn-light"><i className="fas fa-minus text-info"></i></button>;

		let openCloseButton = this.state.closed ? plusButton : minusButton;

		let content = this.state.closed ? '' 
		: (
			<div>
				{
					plan.scenarios.map(scenario => <ScenarioTest key={scenario.idScenario} scenario={scenario} />)
				}
			</div> 
		); 

		return (
			<div>
				<h3>
				{openCloseButton} Plan de Tests : <span className="text-info">{ plan.title }</span></h3>
				{ content }
			</div>
		);
	}
}

class ProjectReport extends React.Component {

	state={
		project: {},
		report: {
			projectTitle: '',
			projectDescription: '',
			/* Pie Chart Data */	
				nbOfCasesOK: 0,
				nbOfCasesNotOK: 0,
				nbOfCasesNotExecuted: 0,
			nbOfCasesTotal: 0,
			plans: [{
				idPlan: 0,
				title: 'Plan title',
				scenarios: [{
					idScenario: 0,
					title: 'Scenario title',
					cases: [{
						idTestCase: 0,
						objective: 'Objectif du Test',
						steps: '<ul><li>1</li><li>2</li></ul>',
						inputs: '',
						expectedOutputs: '',
						executions: [{
							idTestExecution : 1,
							dateOfExecution: moment(),
							outputs: '',
							status: false
						}]
					}]
				}]
			}],
		}
	}

	componentDidMount() {
		let { idProject } = this.props.match.params;
		Axios.get(`${BASE_URL}/projects/${idProject}/report`)
			.then(res => res.data)
			.then(report => this.setState({ report }))
			.catch(err => {
				console.log(err);
				alert(err.message);
			});
	}



	render ()  {

		let { report } = this.state;

		let pieChartData = [
            {
                value: report.nbOfCasesNotOK,
                color:CASE_NOT_OK_COLOR,
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: report.nbOfCasesOK,
                color: CASE_OK_COLOR,
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: report.nbOfCasesNotExecuted,
                color: CASE_NOT_EXECUTED_COLOR,
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

		return (
			<div className="container mt-5">
				<h1 className="">Rapport de Test Logiciel</h1>
				<h3 className="text-info">Fait le { formatDate(moment(), 'Do MMM YYYY à HH:mm') }</h3>
				<hr/>
				<h2>Project : <span className="text-info">{ report.projectTitle }</span></h2>
				<hr/>
				<div className="row p-2">
					<div className="col-md-6 text-center mb-4 border-right">
						<PieChart data={pieChartData} options={{
							responsive: true,
							legend: {
					            display: true,
					            position: "bottom"
					        }
						}}/>
						<div className="pb-2">Nombre de tests effectués pour ce projet = <span className="border rounded p-1">{ report.nbOfCasesTotal }</span></div>
						<div>
							<span style={{ backgroundColor: CASE_NOT_EXECUTED_COLOR }} className="p-1 rounded">{ report.nbOfCasesNotExecuted }</span> Not Tested - 
							<span style={{ backgroundColor: CASE_OK_COLOR }} className="p-1 rounded">{ report.nbOfCasesOK }</span> OK -
							<span style={{ backgroundColor: CASE_NOT_OK_COLOR }} className="text-light p-1 rounded">{ report.nbOfCasesNotOK }</span> NOT OK 
						</div>						
					</div>	
					<div className="col-md-6"></div>
				</div>
				{
					report.plans.map(plan => <PlanTest key={plan.idPlan} plan={plan} />)
				}				
			</div>
		);
	}

} 

export default ProjectReport;