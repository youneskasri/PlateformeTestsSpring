import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

import { Link } from   'react-router-dom';


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
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    let linkNames = Object.keys(this.props.routes);
    let routes = this.props.routes;
   
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
        </Collapse>
      </Navbar>
    );
  }
}

