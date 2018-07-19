import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
		<div className="container-fluid pt-4">
			<div className="row mt-3">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-header container-fluid">
							<div className="row">
								<div className="col-10">
									<h3>Project Title</h3>
								</div>
								<div className="col-2">
									<Link to="/projects" className="btn btn-light text-info btn-block"><i className="fas fa-times"></i></Link>									
								</div>
							</div>
						</div>						

						<form className="container">
							<div className="pb-3 pt-4">
								<input type="text" className="form-control" placeholder="Project title" />
							</div>
							<div className="pb-3">
								<textarea className="form-control" cols="30" rows="5" placeholder="Project Description"></textarea>
							</div>
							<div className="pb-3 input-group">
								<label className="form-control bg-light"> Start Date </label>
								<select  className="form-control" name="startDay" id="">
									<option value="">Day</option>
								</select>
								<select  className="form-control" name="startMonth" id="">
									<option value="">Month</option>
								</select>
								<select  className="form-control" name="startYear" id="">
									<option value="">Year</option>
								</select>
							</div>
							<div className="pb-3 input-group">
								<label className="form-control bg-light"> End Date </label>
								<select  className="form-control" name="startDay" id="">
									<option value="">Day</option>
								</select>
								<select  className="form-control" name="startMonth" id="">
									<option value="">Month</option>
								</select>
								<select  className="form-control" name="startYear" id="">
									<option value="">Year</option>
								</select>
							</div>							
							<button className="btn btn-info btn-block mb-3">Save</button>
						</form>
						
					</div>
				</div>
			</div>
		</div>
	);
