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
		prescriptionName: "",
		prescriptionDosage: "",
		prescriptionDetails: "",
		nextAppointment: "",
		appointmentNotes: "",
		userId: "",
		id: [],
		doctors: [],
		doctor: "",
		typeOfDoctor: "",
		doctorId: "",
		loadingStatus: true,
		modal: false,
		appointments: [],
		activeUser: parseInt(sessionStorage.getItem("userId")),
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
			doctorId: this.state.doctorId,
			appointmentDate: this.state.appointmentDate,
			doctorName: this.state.doctorName,
			officeAddress: this.state.officeAddress,
			doctorNotes: this.state.doctorNotes,
			visitPurpose: this.state.visitPurpose,
			testsRun: this.state.testsRun,
			diagnosis: this.state.diagnosis,
			prescriptionName: this.state.prescriptionName,
			prescriptionDosage: this.state.prescriptionDosage,
			prescriptionDetails: this.state.prescriptionDetails,
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
			.then(appointment =>
				APIManager.getAll("doctors", this.state.activeUserId).then(doctors => {
					console.log(doctors)
					this.setState({
						doctors: doctors,
						appointmentNotes: appointment.appointmentNotes,
						doctorId: appointment.doctorId,
						appointmentDate: appointment.appointmentDate,
						doctorName: appointment.doctorName,
						officeAddress: appointment.officeAddress,
						doctorNotes: appointment.doctorNotes,
						visitPurpose: appointment.visitPurpose,
						testsRun: appointment.testsRun,
						diagnosis: appointment.diagnosis,
						prescriptionName: appointment.prescriptionName,
						prescriptionDosage: appointment.prescriptionDosage,
						prescriptionDetails: appointment.prescriptionDetails,
						nextAppointment: appointment.nextAppointment,
						appointmentNotes: appointment.appointmentNotes,
						loadingStatus: false,
					});
				})
			)
	};

	render() {
		console.log(this.state.type)
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">


								
								<h2 className="modalSubHeader">Doctor Information</h2>

								<label className="addAppt" htmlFor="doctorName">
									Name of Doctor:
									</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="doctorName"
									value={this.state.doctorName}
								/>
								<label className="addAppt" htmlFor="doctorName">
									Type of Doctor:
									</label><br></br>
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
								<br></br>
								<label className="addAppt" htmlFor="officeAddress">Address</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="officeAddress"
									value={this.state.officeAddress}
								/>
							</div>
							<label className="addAppt" htmlFor="doctorNotes">
								Notes about Doctor:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="doctorNotes"
								value={this.state.doctorNotes} />
<hr className="addApptModalLine"></hr>
<h3 className="modalSubHeader">Appointment Details</h3>
<label className="addAppt" htmlFor="appointmentDate">
									Date of Appointment:
									</label>
								<input className="health-input"
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="appointmentDate"
									value={this.state.appointmentDate} />
							<label className="addAppt" htmlFor="visitPurpose">
								Purpose of Visit:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="visitPurpose"
								value={this.state.visitPurpose} />


							<label className="addAppt" htmlFor="testsRun">
								Tests Run:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="testsRun"
								value={this.state.testsRun} />

							<label className="addAppt" htmlFor="diagnosis">
								Appointment diagnosis:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="diagnosis"
								value={this.state.diagnosis} />

							<label className="addAppt" htmlFor="prescriptionName">
								Prescription Name:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="prescriptionName"
								value={this.state.prescriptionName}
							/>

							<label className="addAppt" htmlFor="prescriptionDosage">Dosage Details</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="prescriptionDosage"
								value={this.state.prescriptionDosage}
							/>

							<label className="addAppt" htmlFor="prescriptionDetails">Add your details:</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="prescriptionDetails"
								value={this.state.prescriptionDetails}
							/>

							<label className="addAppt" htmlFor="diagnosis">
								Appointment diagnosis:
									</label>
							<input className="health-input"
								type="text"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="diagnosis"
								value={this.state.diagnosis} />

							<label className="addAppt" htmlFor="nextAppointment">
								Next Appointment Date:
									</label>
							<input className="health-input"
								type="date"
								required
								className="form-control"
								onChange={this.handleFieldChange}
								id="nextAppointment"
								value={this.state.nextAppointment} />
							<label className="addAppt" htmlFor="appointmentNotes">
								Appointment Notes:
									</label>
							<input className="health-input"
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
						className="btn btn-primary-appointment"
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


export default EditAppointmentForm;
