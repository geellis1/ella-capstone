// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddAppointmentForm extends Component {


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
        doctorId: parseInt(1),
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

    addAppointment = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.appointmentDate === "") {
            window.alert("Please input an appointment date");
        } else {
            this.setState({ loadingStatus: true });
            const addedAppointment = {
                userId: this.activeUserId,
                appointmentNotes: this.state.appointmentNotes,
                doctorId: parseInt(this.state.doctorId),
                appointmentDate: this.state.appointmentDate,
                doctorName: this.state.doctorName,
                officeAddress: this.state.officeAddress,
                doctorNotes: this.state.doctorNotes,
                visitPurpose: this.state.visitPurpose,
                testsRun: this.state.testsRun,
                diagnosis: this.state.diagnosis,
                nextAppointment: this.state.nextAppointment,
                appointmentNotes: this.state.appointmentNotes,
            };

            const addedPrescription = {
                prescriptionName: this.state.prescriptionName,
                prescriptionDosage: this.state.prescriptionDosage,
                prescriptionDetails: this.state.prescriptionDetails,
                userId: this.activeUserId
            }
            let appointmentId = ""
            let prescriptionId = ""
            APIManager.post("appointments", addedAppointment)
            .then(res  => appointmentId=res.id)
            .then (() => APIManager.post("prescriptions", addedPrescription) )
            .then ((res ) => prescriptionId=res.id)
            .then (() => {
                let appointmentPrescriptionsObject = {
                    appointmentId: appointmentId,
                    prescriptionId: prescriptionId,
                    userId: this.state.activeUserId
                }
                APIManager.post("appointmentPrescriptions", appointmentPrescriptionsObject)
            })
            .then(() => { this.props.getData()
            .then(() => {this.props.triggerRender()})
            }
                );
        };
    }

    componentDidMount() {
        APIManager.getAll("doctors", this.state.activeUserId).then(doctors => {
            console.log(doctors)
            this.setState({
                doctors: doctors
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
                {" "}
                <Button className="addAppointment" onClick={this.toggle}>
                <i class="fas fa-plus fa-1x"></i>
                    Add Appointment</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        <h1 className="modalHeaders">Log New Appointment</h1>
                        <picture>
                        <img className="editHealthProfileModalHeader" src={require("../../images/ella-appointment-modal-header-01.png")} alt="ella logo" />
              </picture>
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <h3 className="doctorInfoIntroText">Doctor Information</h3>

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
                                    <label className="addAppt" htmlFor="doctorType">
                                        Type of Doctor:
									</label><br></br>
                                    <select
                                        defaultValue="1"
                                        name="doctors"
                                        id="doctorId"
                                        onChange={this.handleFieldChange}>
                                        {this.state.doctors.map(doctor =>
                                            <option className="var" key={doctor.id} value={doctor.id} >
                                                {doctor.typeOfDoctor}
                                            </option>
                                        )}
                                    </select><br></br>
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
<h3 className="doctorInfoIntroText">Appointment Details</h3>
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

                                <label className="addAppt" htmlFor="prescriptionDetails">Prescription details:</label>
                                <input className="health-input"
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="prescriptionDetails"
                                    value={this.state.prescriptionDetails}
                                />


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
                        <Button className="addNewAppt"
                            onClick={this.addAppointment}>
                            <i class="fas fa-plus fa-1x"></i>Add My Appointment
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>
                </Modal>
            </>

        );
    }
}
export default AddAppointmentForm;