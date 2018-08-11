import React from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from "react-router-dom";

import MyNavbar from "./components/MyNavbar";

import Home from "./pages/Home";
import Users from "./pages/Users";
//import NewUser from "./pages/NewUser";


import Projects from "./pages/Projects";
import ShowProject from "./pages/ShowProject";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";

import ShowPlan from "./pages/ShowPlan";
import EditPlan from "./pages/EditPlan";

import ShowScenario from "./pages/ShowScenario";
import EditScenario from "./pages/EditScenario";

import NewCase from "./pages/NewCase";
import ShowCase from "./pages/ShowCase";
import EditCase from "./pages/EditCase";

import AutomatedCaseForm from "./components/AutomatedCaseForm";

import LoginForm from "./pages/LoginForm";
import ProjectReport from "./pages/ProjectReport";


const MyRouter = (props) => {

	let routes = {
		Projects: '/projects',
		Users: '/users',
		Discussion: '/discussion'
	};

	console.log("Rendering MyRouter");

	const NewUser = (props) => (<h1 className="mt-5">HAAAAAALOLLO</h1>);

	return (
		<Router>
			<div className="bg-light">
				{/* Navbar */}
				<MyNavbar routes={routes} />

				{/* Routage */}
				<Switch>
					<Route exact path={routes['Users']} component={Users} />
					<Route exact path={routes['Projects']} component={Projects} />
					<Route path={routes['Discussion']} component={() => ( <h1>Discussion</h1>)} />

					<Route exact path='/login' component={LoginForm} />
					<Route exact path="'/users/new" component={NewUser} />

					<Route exact path="/" component={Home} />
					<Route exact path='/projects/new' component={NewProject} />

					<Route exact path="/projects/:idProject(\d+)/report" component={ProjectReport} />
					
					{/* Be careful, These Are Using Nested Routes */}
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/:idCase(\d+)/edit' component={EditCase} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/:idCase(\d+)' component={ShowCase} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/new' component={NewCase} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/edit' component={EditScenario} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases' component={ShowScenario} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/edit' component={EditPlan} />	
					<Route path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios' component={ShowPlan} />
					<Route path='/projects/:idProject(\d+)/edit' component={EditProject} />
					<Route path='/projects/:idProject(\d+)' component={ShowProject} />

					
				</Switch>
			</div>
		</Router>
	);
}

export default MyRouter;