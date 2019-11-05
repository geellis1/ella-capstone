// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";

class EditPrescriptionForm extends Component {
	//set the initial state
	state = {
        prescriptions: [],
   prescriptionName: "",
   prescriptionDosage: "",
//    activePrescription: "false",
   prescriptionDetails: "",
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

	updateExistingPrescription = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedPrescription = {
			id: parseInt(this.props.prescriptionId),
            prescriptionName: this.state.prescriptionName,
            prescriptionDosage: this.state.prescriptionDosage,
            prescriptionDetails: this.state.prescriptionDetails,
			userId: this.state.activeUser
		};
		console.log(editedPrescription)
		APIManager.update("prescriptions", editedPrescription)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
		return APIManager.get("prescriptions", this.props.prescriptionId)
			.then(
				prescription => {
					this.setState({
						prescriptionName: prescription.prescriptionName,
                        prescriptionDosage: prescription.prescriptionDosage,
                        prescriptionDetails: prescription.prescriptionDetails,
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
							<label className="editHealth" htmlFor="prescriptionName">Name of Prescription</label>

								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="prescriptionName"
									value={this.state.prescriptionName}
								/>
								<label  className="editHealth" htmlFor="prescriptionDosage">Dosage Details</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="prescriptionDosage"
									value={this.state.prescriptionDosage}
								/>
				<label className="editHealth" htmlFor="prescriptionDetails">Share details of prescription</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="prescriptionDetails"
									value={this.state.prescriptionDetails}
								/>
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
							this.updateExistingPrescription(evt);
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


export default EditPrescriptionForm;
