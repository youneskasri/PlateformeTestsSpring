import React from 'react';
import {
	BrowserRouter as Router,
	Route, Switch
} from "react-router-dom";

import MyNavbar from "./components/MyNavbar";

import Home from "./pages/Home";
import Users from "./pages/Users";

import Projects from "./pages/Projects";
import ShowProject from "./pages/ShowProject";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";

import ShowPlan from "./pages/ShowPlan";
import EditPlan from "./pages/EditPlan";

import ShowScenario from "./pages/ShowScenario";

const MyRouter = (props) => {

	let routes = {
		Projects: '/projects',
		Users: '/users',
		Discussion: '/discussion'
	};

	console.log("Rendering MyRouter");

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

					<Route exact path="/" component={Home} />
					<Route exact path='/projects/new' component={NewProject} />

					{/* Be careful, These Are Using Nested Routes */}
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