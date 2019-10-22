// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";

class EditHealthProfileForm extends Component {
	//set the initial state
	state = {
   bloodType: "",
   height: "",
   weight: "",
   allergies: "",
   modal: false,
	loadingStatus: true,
	activeUser: parseInt(sessionStorage.getItem("userId"))
	};


	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingHealthProfile = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedHealthProfile = {
			id: parseInt(this.props.user.id),
            bloodType: this.state.bloodType,
            height: this.state.height,
            weight: this.state.weight,
            allergies: this.state.allergies,
			userId: this.props.pharmacy.userId
		};
		console.log(editedHealthProfile)
		APIManager.update("user", editedHealthProfile)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
					this.setState({
						bloodType: this.props.user.bloodType,
                        height: this.props.user.height,
                        weight: this.props.user.weight,
                        allergies: this.props.user.allergies,
						loadingStatus: false,
						userId: this.props.user.userId
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
									id="bloodType"
									defaultValue={this.state.bloodType}
								/>
								<label htmlFor="bloodType">What is your blood type?</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="weight"
									defaultValue={this.state.weight}
								/>
								<label htmlFor="weight">What is your weight></label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="height"
									defaultValue={this.state.height}
								/>
								<label htmlFor="height">What is your height?</label>

                                <input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="allergies"
									defaultValue={this.state.allergies}
								/>
								<label htmlFor="allergies">Do you have any allergies?</label>
							</div>
							<div className="alignRight"></div>
						</fieldset>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						type="button"
						onClick={evt => {
							this.updateExistingHealthProfile(evt);
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


export default EditHealthProfileForm;
