import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

import { Link, withRouter } from   'react-router-dom';
import auth from "../actions/auth";

const AuthButton = withRouter(({ history }) => (
  auth.isLogged() ? (
    <div>
      <span className="text-light">Welcome { sessionStorage.getItem("firstName") } ! </span> 
      <button 
        className="ml-2 btn btn-sm btn-light"
        onClick={() => {
          auth.logout();
          history.push('/');
        }}>
        Sign out <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  ) : (
    <div className="text-light">You are not logged in.</div>
  )
))


const MyNavItem = (props) => {
  return (
    <NavItem className="p-1">
      	<Link to={props.href} className="text-light"> {props.text}</Link>
    </NavItem>
  ); 
}

export default class MyNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.state = {
      isOpen: false,
      refresh: 1
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClickLogout() {
    alert("Logout");
    sessionStorage.removeItem("token");

    this.setState({ refresh: this.state.refresh + 1});
  }

  render() {

    let linkNames = Object.keys(this.props.routes);
    let routes = this.props.routes;

    if (auth.isAdmin() === false){
      routes = {
        Projects: '/projects',
        Discussion: '/discussion'
      };
    }
   
    return (
      <Navbar color="info" dark expand="md">
        <h4 className="pt-1">
        	<Link to="/" className="text-light">
	         	<i className="fas fa-stethoscope"></i> OnlineTester       		
        	</Link>
        </h4>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mx-auto" navbar>
            {
            	linkNames.map((linkName, i) => (
            		<MyNavItem key={i} href={ routes[linkName] } text={ linkName } />
            	))
            }
          </Nav>
          <AuthButton />         
        </Collapse>
      </Navbar>
    );
  }
}

