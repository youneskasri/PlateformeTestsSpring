import React from 'react';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import Scenario from "../components/Scenario";
import Case from "../components/Case";
import NewCase from "../components/NewCase";
import Axios from "axios";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function deleteScenarioById(idProject, idPlan, idScenario) {
	return  Axios.delete(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}`)
		.then(response => response.data);
}

class ShowScenario extends React.Component {

	state={
		scenario: {},
		cases: [],
		redirection: null
	}

	handleDelete = (evt) => {
		evt.preventDefault();
		confirmAlert({
	      title: 'Confirmer la suppression',
	      message: 'Are you sure to do this.',
	        customUI: ({ onClose }) => {
			    return (
			      <div className="bg-light p-4 pt-1 border rounded">
			        <h1 className="text-info">Are you sure?</h1>
			        <hr/>
			        <p>You want to delete this Scenario?</p>
			        <div className="btn-group ml-5 pr-3">
				        <button className="btn btn-info" onClick={onClose}>No, don't</button>
				        <button className="btn btn-danger" onClick={() => {
				            this.destroyScenario()
				            onClose()
				        }}>Yes, Delete it!</button>
			        </div>
			      </div>
			    )
			  }
	    });
	}

	destroyScenario = () => {
		let { idProject, idPlan, idScenario } = this.props.match.params;

		deleteScenarioById(idProject, idPlan, idScenario)
			.then(bool => console.log('deleted ?', bool))
			.then(()=> {
				let redirection = (
					<Redirect to={`/projects/${idProject}/plans/${idPlan}/scenarios`} />
				);
				this.setState({ redirection });
			})
			.catch(console.log);
	}

	componentDidMount() {
		let { idProject, idPlan, idScenario } = this.props.match.params;
		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}`)
			.then(res => res.data)
			.then(scenario => this.setState({ scenario }));


		Axios.get(`http://localhost:8080/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/cases`)
			.then(res => res.data)
			.then(cases => this.setState({ cases }))
			.then(() => console.log(this.state.cases))
			.catch(console.log);
	}



	render ()  {

		let { idProject, idPlan, idScenario } = this.props.match.params;
		console.log(idProject, ' ', idPlan, ' ', idScenario);

		let { scenario } = this.state;

		let testCases = this.state.cases.map(testCase => 	(
			<li key={testCase.idTestCase} className="list-group-item">
				<Link className="text-info" to={`${this.props.match.url}/${testCase.idTestCase}`}>{ testCase.objective }</Link>
			</li>
		));

		/*
		* Tanchof mn ba3d ach ndir f'had Composant 3
		*/
		const NoMatch = (props) => (
			<div className="text-center pt-5 pb-3 text-info border ">
				<h5>
					<i className="fas fa-book-open fa-5x"></i>
				</h5>
				<hr/>
				<div className="btn-group">
					<div className="btn btn-outline-info">Btn 1</div>
					<div className="btn btn-outline-info">Btn 2</div>
					<div className="btn btn-outline-info">Btn 3</div>	
				</div>
			</div>
		);

		let dynamicCanvas = (
			<Switch>				
				<Route path={`${this.props.match.path}/:idCase`} component={Case} />
				<Route component={NoMatch} />
			</Switch>
		);

		console.log(this.props.match.path);

		console.log("Rendering ShowScenario");
		return (
			<div className="container mt-5">
				{ this.state.redirection }
				<div className="row">
					<div className="col-2">
						<h1 className="text-center text-info">
						Scenario N°{idProject}-{idPlan}-{idScenario}
						</h1>
						<div className="text-center">
							<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios/${idScenario}/edit`} className="text-secondary">Update</Link>
							<Link to="/" onClick={this.handleDelete} className="ml-1 text-danger">Delete</Link>
						</div>
						<div className="text-center">
							<hr className="mb-0"/>
							<Link to={`/projects/${idProject}/plans/${idPlan}/scenarios`} className="text-info">Back to Plan</Link>
						</div>
					</div>			
					<div className="col-10">
						<Scenario match={this.props.match} scenario={scenario} hideLinks/>
					</div>
				</div>
				<div className="mt-3"></div>
				<div className="row">
					<div className="col-md-6">
						<h4 className="card-header bg-lightBlue">
							Test Cases
							<Link to={`${this.props.match.url}/new`} className="text-info float-right">
								<small><i className="fa fa-plus"></i> Add a test Case</small>
							</Link>
						</h4>
						<ul className="list-group list-group-flush">
							{ testCases }
						</ul>					
					</div>
					<div className="col-md-6">
						{ dynamicCanvas }
					</div>
				</div>
			</div>
		);
	};

}

export default ShowScenario;