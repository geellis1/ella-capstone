// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";

class EditPharmacyForm extends Component {
	//set the initial state
	state = {
   pharmacyName: "",
   pharmacyNumber: "",
   pharmacyDetails: "",
   modal: false,
	loadingStatus: true,
	activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	activeUserId = parseInt(sessionStorage.getItem("userId"))


	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingPharmacy = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedPharmacy = {
			id: parseInt(this.props.pharmacy.id),
            pharmacyName: this.state.pharmacyName,
            pharmacyNumber: this.state.pharmacyNumber,
            pharmacyDetails: this.state.pharmacyDetails,
			userId: this.props.pharmacy.userId
		};
		console.log(this.props.pharmacy.id)
		APIManager.update("pharmacy", editedPharmacy)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
					this.setState({
						pharmacyName: this.props.pharmacy.pharmacyName,
                        pharmacyNumber: this.props.pharmacy.pharmacyNumber,
                        pharmacyDetails: this.props.pharmacy.pharmacyDetails,
						loadingStatus: false,
						userId: this.props.pharmacy.userId
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
							<label className="editHealth" htmlFor="pharmacyName">Name of Pharmacy</label>
								<input className="health-input"
									type="text"
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyName"
									defaultValue={this.state.pharmacyName}
								/>
								<label className="editHealth" htmlFor="pharmacyNumber">Pharmacy Phone Number</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyNumber"
									defaultValue={this.state.pharmacyNumber}
								/>
<label className="editHealth" htmlFor="pharmacyDetails">Share details of pharmacy</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="pharmacyDetails"
									defaultValue={this.state.pharmacyDetails}
								/>
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						onClick={evt => {
							this.updateExistingPharmacy(evt);
							this.props.toggle();
						}}
						className="btn btn-primary-health"
					>
					<i class="fas fa-check fa-1x"></i>
						Submit
					</Button>
				</ModalFooter>
			</>
		);
	}
}


export default EditPharmacyForm;
