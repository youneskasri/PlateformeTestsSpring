import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
		<div className="container mt-5">
			<div className="row">
				<div className="col-6 mt-5">
					<h2>Online Tester</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum
					</p>
				</div>
				<div className="col-6 mt-5">
					<h2>How To Use ?</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt laborum
					</p>
				</div>
			</div>
			<div className="row mt-3">
			{
				sessionStorage.getItem("token") ?
					<Link to="/projects" className="btn btn-info mx-auto mt-5 btn-lg">Start now</Link>	
					: <Link to="/login" className="btn btn-info mx-auto mt-5 btn-lg">Start now !</Link>
			}
			</div>
		</div>
	);	