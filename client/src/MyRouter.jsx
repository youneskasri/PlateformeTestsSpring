import React from 'react';
import {
	BrowserRouter as Router,
	Route, Switch, Redirect
} from "react-router-dom";

import MyNavbar from "./components/MyNavbar";

import Home from "./pages/Home";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";

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

const BASE_NAME = require("./params").basename;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
		 
		 if (props.role && props.role !== sessionStorage.getItem('role')) {
		 	return (
		 		<h1>Not Found</h1>
		 	)
		 }

		 return (
		    sessionStorage.getItem("token") !== null
		      ? <Component {...props} />
		      : <Redirect to={{
		          pathname: '/login',
		          state: { from: props.location }
		        }} />
		  );
	  }
  } />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
		 
		 let token = sessionStorage.getItem("token");
		 let role = sessionStorage.getItem("role");

		 if (token !== null && "ADMIN" !== role) {
		 	return (
		 		<h1>Unauthorized</h1>
		 	)
		 }

		 return (
		    token !== null
		      ? <Component {...props} />
		      : <Redirect to={{
		          pathname: '/login',
		          state: { from: props.location }
		        }} />
		  );
	  }
  } />
);

const MyRouter = (props) => {

	let routes = {
		Projects: '/projects',
		Users: '/users',
		Discussion: '/discussion'
	};

	console.log("Rendering MyRouter");

	return (
		<Router basename={BASE_NAME}>
			<div className="bg-light">
				{/* Navbar */}
				<MyNavbar routes={routes} />

				{/* Routage */}
				<Switch>
					<Route exact path='/login' component={LoginForm} />
					<Route exact path='/' component={Home} />
					<Route exact path={BASE_NAME} component={Home} />

					<AdminRoute exact path={routes['Users']} component={Users} />
					<PrivateRoute exact path={routes['Projects']} component={Projects} />
					<PrivateRoute path={routes['Discussion']} component={() => ( <h1>Discussion</h1>)} />

					
					<AdminRoute exact path='/users/new' component={NewUser} />
					<AdminRoute exact path='/users/:idUser(\d+)/edit' component={EditUser} />

					<PrivateRoute exact path='/projects/new' component={NewProject} />
					<PrivateRoute exact path="/projects/:idProject(\d+)/report" component={ProjectReport} />
					
					{/* Be careful, These Are Using Nested Routes */}
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/:idCase(\d+)/edit' component={EditCase} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/:idCase(\d+)' component={ShowCase} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases/new' component={NewCase} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/edit' component={EditScenario} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios/:idScenario/cases' component={ShowScenario} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/edit' component={EditPlan} />	
					<PrivateRoute path='/projects/:idProject(\d+)/plans/:idPlan(\d+)/scenarios' component={ShowPlan} />
					<PrivateRoute path='/projects/:idProject(\d+)/edit' component={EditProject} />
					<PrivateRoute path='/projects/:idProject(\d+)' component={ShowProject} />
					
				</Switch>
			</div>
		</Router>
	);
}

export default MyRouter;