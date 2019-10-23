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
        prescriptionsGiven: "",
        nextAppointment: "",
        appointmentNotes: "",
        userId: "",
        id: [],
        doctors: [],
        doctor: "",
        typeOfDoctorId: "",
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
        if (this.state.appointmentNotes === "") {
            window.alert("Please input an appointment");
        } else {
            this.setState({ loadingStatus: true });
            const addedAppointment = {
                userId: this.activeUserId,
                appointmentNotes: this.state.appointmentNotes,
                typeOfDoctorId: this.state.typeOfDoctorId,
                appointmentDate: this.state.appointmentDate,
                doctorName: this.state.doctorName,
                officeAddress: this.state.officeAddress,
                doctorNotes: this.state.doctorNotes,
                visitPurpose: this.state.visitPurpose,
                testsRun: this.state.testsRun,
                diagnosis: this.state.diagnosis,
                prescriptionsGiven: this.state.prescriptionsGiven,
                nextAppointment: this.state.nextAppointment,
                appointmentNotes: this.state.appointmentNotes,
            };

            APIManager.post("appointments", addedAppointment)
                .then(() => { this.props.getData() }
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
                    Add Appointment</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Create Appointment
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="appointmentDate">
                                        Date of Appointment:
									</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="appointmentDate"
                                        value={this.state.appointmentDate} />
                                    <h2>Doctor Information</h2>

                                    <label htmlFor="doctorName">
                                        Name of Doctor:
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="doctorName"
                                        value={this.state.doctorName}
                                    />
                                    <select
                                        defaultValue=""
                                        name="doctors"
                                        id="typeofDoctorId"
                                        onChange={this.handleFieldChange}>
                                        {this.state.doctors.map(doctor =>
                                            <option className="var" key={doctor.id}  value={doctor.id} >
                                                {doctor.typeOfDoctor}
                                            </option>
                                        )}
                                    </select>
                                    <label htmlFor="officeAddress">Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="officeAddress"
                                        value={this.state.officeAddress}
                                    />
                                </div>
                                <label htmlFor="doctorNotes">
                                    Notes about Doctor:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="doctorNotes"
                                    value={this.state.doctorNotes} />

                                <label htmlFor="visitPurpose">
                                    Puprose of Visit:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="visitPurpose"
                                    value={this.state.visitPurpose} />


                                <label htmlFor="testsRun">
                                    Tests Run:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="testsRun"
                                    value={this.state.testsRun} />

                                <label htmlFor="diagnosis">
                                    Appointment diagnosis:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="diagnosis"
                                    value={this.state.diagnosis} />

                                <label htmlFor="prescriptionsGiven">
                                    What prescriptions were  you given?:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="prescriptionsGiven"
                                    value={this.state.prescriptionsGiven} />

                                <label htmlFor="diagnosis">
                                    Appointment diagnosis:
									</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="diagnosis"
                                    value={this.state.diagnosis} />

                                <label htmlFor="nextAppointment">
                                    Next Appointment Date:
									</label>
                                <input
                                    type="date"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="nextAppointment"
                                    value={this.state.nextAppointment} />
                                <label htmlFor="appointmentNotes">
                                    Appointment Notes:
									</label>
                                <input
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
                        <Button className="add"
                            onClick={this.addAppointment}>Add
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