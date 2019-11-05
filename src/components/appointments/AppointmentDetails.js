import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./appointment.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ShowAppointmentDetails extends Component {
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
        id: [],
        doctors: [],
        doctor: "",
        doctorId: parseInt(1),
        appointments: [],
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

    componentDidMount() {
        return APIManager.get("appointments", this.props.appointmentId)
            .then(
                appointment => {
                    this.setState({
                        appointmentNotes: appointment.appointmentNotes,
                        appointmentDate: appointment.appointmentDate,
                        doctorName: appointment.doctorName,
                        officeAddress: appointment.officeAddress,
                        doctorNotes: appointment.doctorNotes,
                        visitPurpose: appointment.visitPurpose,
                        testsRun: appointment.testsRun,
                        diagnosis: appointment.diagnosis,
                        prescriptionName: appointment.prescriptionName,
                        prescriptionDosage: appointment.prescriptionDosage,
                        prescriptionDetails: appointment.prescriptionDetails,
                        nextAppointment: appointment.nextAppointment,
                    });
                });
    };

    render() {
        return (
            <>
                <ModalBody>
                    hello this is a modal test<br></br>
                    <h4>Date of Appointment></h4>{this.state.appointmentDate}
                    <h3>Doctor Information</h3>
                    <h4>Name of Doctor</h4>{this.state.doctorName}
                    <h4>Type of Doctor</h4>{this.state.doctorName}
                    <h4>Office Location</h4>{this.state.officeAddress}
                    <h4>Notes About Doctor</h4>{this.state.doctorNotes}
                    <h4>Purpose of Visit</h4>{this.state.visitPurpose}
                    <h4>Tests Run</h4>{this.state.testsRun}
                    <h4>Diagnosis</h4>{this.state.diagnosis}
                    <h1>Appointment Prescriptions</h1>
                    <h4>Prescription Name</h4>{this.state.prescriptionName}
                    <h4>Dosage Details</h4>{this.state.prescriptionDosage}
                    <h4>Prescription Details</h4>{this.state.prescriptionDetails}
                    <h4>Next Appointment Date</h4>{this.state.nextAppointment}
                    <h4>Additional Appointment Notes</h4>{this.state.appointmentNotes}
				</ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={evt => {
                            this.props.toggle(evt);
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
        )
    }
}

export default ShowAppointmentDetails;
