// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter } from "reactstrap";

class EditRecommendationForm extends Component {
	//set the initial state
	state = {
		recommendations: [],
		nameOfDoctor: "",
		recommendationDetails: "",
		personRecommended: "",
		doctors: [],
		doctor: "",
		typeOfDoctor: "",
		doctorId: "",
		id: [],
		userId: "",
		modal: false,
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingRecommendation = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedRecommendation = {
			id: parseInt(this.props.recommendationId),
			nameOfDoctor: this.state.nameOfDoctor,
			recommendationDetails: this.state.recommendationDetails,
			personRecommended: this.state.personRecommended,
			doctorId: this.state.doctorId,
			userId: this.state.activeUser
		};
		console.log(editedRecommendation)
		APIManager.update("recommendations", editedRecommendation)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("recommendations", this.props.recommendationId)
			.then(recommendation =>
				APIManager.getAll("doctors", this.state.activeUserId).then(doctors => {
					console.log(doctors)
					this.setState({
						doctors: doctors,
						nameOfDoctor: recommendation.nameOfDoctor,
						recommendationDetails: recommendation.recommendationDetails,
						personRecommended: recommendation.personRecommended,
						doctorId: recommendation.doctorId,
						loadingStatus: false,
					});
				})
			)
	};

	render() {
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
							<label className="addAppt" htmlFor="nameOfDoctor">Name of Recommended Doctor</label>
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="nameOfDoctor"
									value={this.state.nameOfDoctor}
								/>
								
								<label className="addAppt" htmlFor="recommendationDetails">Details on Recommendation</label>
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="recommendationDetails"
									value={this.state.recommendationDetails}
								/>
								
								<label className="addAppt" htmlFor="personRecommended">Who made this recommendation?</label>
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="personRecommended"
									value={this.state.personRecommended}
								/>
								<label className="addAppt" htmlFor="typeOfDoctor">Type of Doctor</label><br></br>
								{this.state.doctors.length > 0 ? <select
									defaultValue={this.state.doctorId}
									name="doctors"
									id="doctorId"
									onChange={this.handleFieldChange}>
									{this.state.doctors.map(doctor =>
										<option className="var" key={doctor.id} id={doctor.id} value={doctor.id} >
											{doctor.typeOfDoctor}
										</option>
									)}
								</select> : ""}
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingRecommendation(evt);
							this.props.toggle();
						}}
						className="btn btn-primary-recommendation"
					>
					<i class="fas fa-check fa-1x"></i>
					
						Submit
					</Button>
					<Button className="cancel" onClick={this.props.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</>
		);
	}
}


export default EditRecommendationForm;
