// Purpose of the file to hold edit task form function
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, ModalBody, ModalFooter} from "reactstrap";
import moment from 'moment'

class EditHealthProfileForm extends Component {
	moment =  require('moment');
    date = moment().format('LLL');
	//set the initial state
	state = {
   bloodType: "",
   weight: "",
   height: "",
   allergies: "",
   dateUpdated: this.date,
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
			id: parseInt(this.props.healthProfile.id),
            bloodType: this.state.bloodType,
            height: this.state.height,
			weight: this.state.weight,
			allergies: this.state.allergies,
			userId: this.props.healthProfile.userId,
			dateUpdated: this.state.dateUpdated
		};
		console.log(editedHealthProfile)
		APIManager.update("healthProfile", editedHealthProfile)
			.then(() => { this.props.getData() }
			);
	}


	componentDidMount() {
					this.setState({
						bloodType: this.props.healthProfile.bloodType,
                        height: this.props.healthProfile.height,
						weight: this.props.healthProfile.weight,
						allergies: this.props.healthProfile.allergies,
						dateUpdated: this.state.dateUpdated,
						loadingStatus: false,
						userId: this.props.healthProfile.userId
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
								<label className="editHealth" htmlFor="bloodType">What is your blood type?</label>
								<input  className="health-input"
									type="text"
									className="form-control"
									onChange={this.handleFieldChange}
									id="bloodType"
									defaultValue={this.state.bloodType}
								/>
								<label className="editHealth" htmlFor="height">What is your height?</label>
								<input  className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="height"
									defaultValue={this.state.height}
								/>
								<label className="editHealth" htmlFor="weight">What is your weight?</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="weight"
									defaultValue={this.state.weight}
								/>

								<label className="editHealth" htmlFor="allergies">What allergies do you have?</label>
								<input className="health-input"
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="allergies"
									defaultValue={this.state.allergies}
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
							this.updateExistingHealthProfile(evt);
							this.props.toggle();
						}}
						className="btn btn-primary-health"
					>
					<i class="fas fa-check fa-1x"></i>
						Update
					</Button><br></br>
					{/* <h2>Today's Date: {this.state.dateUpdated}</h2> */}
				</ModalFooter>
			</>
		);
	}
}


export default EditHealthProfileForm;
