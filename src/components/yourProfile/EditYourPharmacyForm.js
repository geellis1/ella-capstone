// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";

class EditPharmacyForm extends Component {
	//set the initial state
	state = {
   pharmacy: "",
   pharmacyName: "",
   pharmacyNumber: "",
   pharmacyDetails: "",
   userId: "",
   modal: false,
	loadingStatus: true,
	modal: false,
	activeUser: parseInt(sessionStorage.getItem("userId"))
	};


	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		// this.setState(stateToChange);
	};

	updateExistingPharmacy = evt => {
	// 	evt.preventDefault();
	// 	this.setState({ loadingStatus: true });
	// 	const editedPharmacy = {
	// 		id: parseInt(this.props.pharmacyId),
    //         pharmacyName: this.state.pharmacyName,
    //         pharmacyNumber: this.state.prescriptionNumber,
    //         pharmacyDetails: this.state.pharmacyDetails,
	// 		userId: this.props.activeUser
	// 	};
	// 	console.log(editedPharmacy)
	// 	APIManager.update("pharmacy", editedPharmacy)
	// 		.then(() => { this.props.getData() }
	// 		);
	}


	componentDidMount() {
		console.log("componentDidMount")
		APIManager.getUserPharmacy("pharmacy", this.props.activeUserId).then(pharmacy => {
					console.log("pharmacy", pharmacy)
					this.setState({
						pharmacyName: pharmacy.pharmacyName,
                        pharmacyNumber: pharmacy.pharmacyNumber,
                        pharmacyDetails: pharmacy.pharmacyDetails,
						loadingStatus: false,
						userId: this.props.activeUser
					});
				});
	};

	render() {
		console.log("render", this.state)
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyName"
									value={this.state.pharmacyName || ""}
								/>
								<label htmlFor="pharmacyName">Name of Pharmacy</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyNumber"
									value={this.state.pharmacyNumber || ""}
								/>
								<label htmlFor="pharmacyNumber">Pharmacy Phone Number</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyDetails"
									value={this.state.pharmacyDetails || ""}
								/>
								<label htmlFor="pharmacyDetails">Share details of pharmacy</label>
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
							this.updateExistingPharmacy(evt);
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


export default EditPharmacyForm;
