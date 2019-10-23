// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter } from "reactstrap";

class EditAppointmentForm extends Component {
	//set the initial state
	state = {
		appointmentDate: "",
		doctorName: "",
		officeAddress: "",
		doctorNotes: "",
		visitPurpose: "",
		testsRun: "",
		diagnosis: "",
		prescriptionsGiven: "",
		nextAppointment: "",
		appointmentNotes: "",
		userId: "",
		id: [],
		doctors: [],
		doctor: "",
		typeOfDoctor: "",
		loadingStatus: true,
		modal: false,
		appointments: [],
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingAppointment = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedAppointment = {
			id: parseInt(this.props.appointmentId),
			appointmentNotes: this.state.appointmentNotes,
			userId: this.state.activeUser,
			typeOfDoctorId: this.state.typeOfDoctorId,
			appointmentDate: this.state.appointmentDate,
			doctorName: this.state.doctorName,
			officeAddress: this.state.officeAddress,
			doctorNotes: this.state.doctorNotes,
			visitPurpose: this.state.visitPurpose,
			testsRun: this.state.testsRun,
			diagnosis: this.state.diagnosis,
			prescriptionsGiven: this.state.prescriptionsGiven,
			nextAppointment: this.state.nextAppointment,
			appointmentNotes: this.state.appointmentNotes,
		};
		console.log(editedAppointment)
		APIManager.update("appointments", editedAppointment)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("appointments", this.props.appointmentId)
			.then(appointment  =>
				APIManager.getAll("doctors", this.state.activeUserId).then(doctors => {
					console.log(doctors)
					this.setState({
						doctors: doctors,
						appointmentNotes: appointment.appointmentNotes,
						typeOfDoctorId: appointment.typeOfDoctorId,
						appointmentDate: appointment.appointmentDate,
						doctorName: appointment.doctorName,
						officeAddress: appointment.officeAddress,
						doctorNotes: appointment.doctorNotes,
						visitPurpose: appointment.visitPurpose,
						testsRun: appointment.testsRun,
						diagnosis: appointment.diagnosis,
						prescriptionsGiven: appointment.prescriptionsGiven,
						nextAppointment: appointment.nextAppointment,
						appointmentNotes: appointment.appointmentNotes,
						loadingStatus: false,
				
					});
				})
			)};

	render() {
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<label htmlFor="appointmentDate">
									Date of Appointment:
									</label>
								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="appointmentDate"
									value={this.state.appointmentDate} />
								<h2>Doctor Information</h2>

								<label htmlFor="doctorName">
									Name of Doctor:
									</label>
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="doctorName"
									value={this.state.doctorName}
								/>
								<select
									value={this.state.typeOfDoctorId}
									name="doctors"
									id="doctor"
									onChange={this.handleFieldChange}>
									{this.state.doctors.map(doctor =>
										<option className="var" key={doctor.id} id={doctor.typeOfDoctor} value={doctor.id} >
											{doctor.typeOfDoctor}
										</option>
									)}
								</select>
								<label htmlFor="officeAddress">Address</label>
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="officeAddress"
									value={this.state.officeAddress}
								/>
							</div>
							<label htmlFor="doctorNotes">
								Notes about Doctor:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="doctorNotes"
								value={this.state.doctorNotes} />

							<label htmlFor="visitPurpose">
								Puprose of Visit:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="visitPurpose"
								value={this.state.visitPurpose} />


							<label htmlFor="testsRun">
								Tests Run:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="testsRun"
								value={this.state.testsRun} />

							<label htmlFor="diagnosis">
								Appointment diagnosis:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="diagnosis"
								value={this.state.diagnosis} />

							<label htmlFor="prescriptionsGiven">
								What prescriptions were  you given?:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="prescriptionsGiven"
								value={this.state.prescriptionsGiven} />

							<label htmlFor="diagnosis">
								Appointment diagnosis:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="diagnosis"
								value={this.state.diagnosis} />

							<label htmlFor="nextAppointment">
								Next Appointment Date:
									</label>
							<input
								type="date"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="nextAppointment"
								value={this.state.nextAppointment} />
							<label htmlFor="appointmentNotes">
								Appointment Notes:
									</label>
							<input
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="appointmentNotes"
								value={this.state.appointmentNotes}
							/>
							<div className="alignRight">
							</div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						disabled={this.state.loadingStatus}
						onClick={evt => {
							this.updateExistingAppointment(evt);
							this.props.toggle();
						}}
						className="btn btn-primary"
					>
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


export default EditAppointmentForm;
