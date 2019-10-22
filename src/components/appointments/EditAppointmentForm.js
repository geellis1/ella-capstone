// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";

class EditAppointmentForm extends Component {
	//set the initial state
	state = {
        appointments: [],
   appointmentNotes: "",
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

	updateExistingAppointment = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedAppointment = {
			id: parseInt(this.props.appointmentId),
            appointmentNotes: this.state.appointmentNotes,
			userId: this.state.activeUser
		};
		console.log(editedAppointment)
		APIManager.update("appointments", editedAppointment)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("appointments", this.props.appointmentId)
			.then(
				appointment => {
					this.setState({
						appointmentNotes: appointment.appointmentNotes,
						loadingStatus: false,
					});
				});
	};

	render() {
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="appointmentNotes"
									value={this.state.appointmentNotes}
								/>
								<label htmlFor="appointmentNotes">Notes from Appointment</label>
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
