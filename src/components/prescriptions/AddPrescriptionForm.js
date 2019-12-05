// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddPrescriptionForm extends Component {


    //set the initial state
    state = {
        prescriptionName: "",
        prescriptionDosage: "",
        prescriptionDetails: "",
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

    addPrescription = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.prescriptionName === "" || this.state.prescriptionDosage === "") {
            window.alert("Please input a prescription");
        } else {
            this.setState({ loadingStatus: true });
            const addedPrescription = {
                userId: this.activeUserId,
                prescriptionName: this.state.prescriptionName,
                prescriptionDosage: this.state.prescriptionDosage,
                prescriptionDetails: this.state.prescriptionDetails,
            };

            APIManager.post("prescriptions", addedPrescription)
                .then(() => { this.props.getData() }
                );
        };
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>
                {" "}
                <Button className="addPrescription" onClick={this.toggle}>
                    <i class="fas fa-plus fa-1x"></i>
                    Add Prescription</Button>
                    <hr></hr>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        <h1 className="modalHeaders">Add New Prescription</h1>
                        <picture>
                        <img className="editHealthProfileModalHeader" src={require("../../images/ella-prescription-modal header-01.png")} alt="ella logo" />
                        </picture>
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label className="editHealth" htmlFor="prescriptionName">
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
                                    <label className="editHealth" htmlFor="prescriptionDosage">Dosage Details</label>

                                    <input className="health-input"
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="prescriptionDosage"
                                        value={this.state.prescriptionDosage}
                                    />

                                    <label className="editHealth" htmlFor="prescriptionDetails">Add your details:</label>
                                    <input className="health-input"
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="prescriptionDetails"
                                        value={this.state.prescriptionDetails}
                                    />
                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn btn-primary-health"
                            onClick={this.addPrescription}
                        >
                            Add
						</Button>{" "}
                        {/* <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button> */}
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default AddPrescriptionForm;