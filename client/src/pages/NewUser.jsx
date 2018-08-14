import React from 'react';
import { Link } from 'react-router-dom';

const NewUser = (props) => (
	<div className="container-fluid mt-5">
		<div className="row">
			<div className="offset-md-2 col-md-8">
				<div className="card">
					<div className="card-header bg-info text-center text-light">
						<h4>Nouvel utilisateur <Link to="/users" className="float-right text-light"><i className="fas fa-times"></i></Link></h4>
					</div>
					<div className="card-body">				
						<form>
							<div className="form-group">
								<label>Nom</label>
								<input type="text" placeholder="nom de l'utilisateur" className="form-control" required/>
							</div>	
							<div className="form-group">
								<label>Prénom</label>
								<input type="text" placeholder="prénom de l'utilisateur" className="form-control" required/>
							</div>	
							<div className="form-group">
								<label>Email</label>
								<input type="text" placeholder="email de l'utilisateur" className="form-control" required/>
							</div>		
							<div className="form-group">
								<label>Role</label>
								<select  className="form-control" name="" id="">
									<option value="TESTEUR">Testeur</option>														
									<option value="ARCHITECT">Concepteur</option>
									<option value="MANAGER">Manager</option>
									<option value="ADMIN">Admin</option>
								</select>
							</div>					
							<button className="btn btn-info btn-block">Save</button>
						</form>
					</div>
				</div>
			</div>
		</div>

	</div>
);

export default NewUser;