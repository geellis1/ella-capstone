// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddPharmacyForm extends Component {


    //set the initial state
    state = {
        pharmacyName: "",
        pharmacyNumber: "",
        pharmacyDetails: "",
        userId: "",
        id: [],
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addYourProfile = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.pharmacyName === "" || this.state.pharmacyNumber === "") {
            window.alert("Please input your pharmacy information");
        } else {
            this.setState({ loadingStatus: true });
            const addedPharmacy = {
                userId: this.activeUserId,
                pharmacyName: this.state.pharmacyName,
                pharmacyNumber: this.state.pharmacyNumber,
                pharmacyDetails: this.state.pharmacyDetails,
            };

            APIManager.post("pharmacy", addedPharmacy)
                .then((res) => {
                    this.props.getData() }
                );
        };
    }

    componentDidMount() {
        APIManager.getAll("pharmacy", this.state.activeUserId).then(pharmacy => {
            console.log(pharmacy)
            this.setState({
                pharmacy: pharmacy
            });
        });
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>

                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="pharmacyName">
                                        Pharmacy Name:
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="pharmacyName"
                                        value={this.state.pharmacyName}
                                    />

                                    <label htmlFor="pharmacyNumber">Dosage Details</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="pharmacyNumber"
                                        value={this.state.pharmacyNumber}
                                    />

                                    <label htmlFor="pharmacyDetails">Add your details:</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="pharmacyDetails"
                                        value={this.state.pharmacyDetails}
                                    />
                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                        className="add"
                            onClick={(evt) => {
                                this.addYourProfile(evt)
                                this.props.toggle()}}
                        >
                            Add
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>

            </>
        );
    }
}

export default AddPharmacyForm;