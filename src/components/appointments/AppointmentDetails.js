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
        prescriptions: [],
        prescriptionName: "",
        prescriptionDosage: "",
        prescriptionDetails: "",
        nextAppointment: "",
        appointmentNotes: "",
        id: [],
        doctors: [],
        doctorId: "1",
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

    // componentDidMount() {
    //     return APIManager.get("appointments", this.props.appointmentId)
    //         .then(appointment =>
	// 			APIManager.getRecommendation("doctors", this.state.activeUserId).then(doctors => {
    //                 this.setState({
    //                     doctors: doctors,
    //                     doctorId: appointment.doctorId,
    //                     appointmentNotes: appointment.appointmentNotes,
    //                     appointmentDate: appointment.appointmentDate,
    //                     doctorName: appointment.doctorName,
    //                     officeAddress: appointment.officeAddress,
    //                     doctorNotes: appointment.doctorNotes,
    //                     visitPurpose: appointment.visitPurpose,
    //                     testsRun: appointment.testsRun,
    //                     diagnosis: appointment.diagnosis,
    //                     prescriptionName: appointment.prescriptionName,
    //                     prescriptionDosage: appointment.prescriptionDosage,
    //                     prescriptionDetails: appointment.prescriptionDetails,
    //                     nextAppointment: appointment.nextAppointment,
    //                 });
    //             })
    //         )
    // };

    render() {
        return (
            <>
                <ModalBody>
    <section>
                    <h3 className="appointmentDetailsSubHeader">Doctor Information</h3>
                    <h4 className="apptDetailsHeader">Name of Doctor</h4><h5 className="apptDetailsInfoText">{this.props.doctorName}</h5>
                    <h4 className="apptDetailsHeader">Type of Doctor</h4>
                    <h5 className="apptDetailsInfoText">{this.props.doctorId}</h5>
                    <h4 className="apptDetailsHeader">Office Location</h4><h5 className="apptDetailsInfoText">{this.props.officeAddress}</h5>
                    <h4 className="apptDetailsHeader">Notes About Doctor</h4><h5 className="apptDetailsInfoText">{this.props.doctorNotes}</h5>
                    <hr className="appointmentDetailsModalLine"></hr>
                    <h3 className="appointmentDetailsSubHeader">Appointment Details</h3>
                    <h4 className="apptDetailsHeader">Date of Appointment</h4><h5 className="apptDetailsInfoText">{this.props.appointmentDate}</h5>
                    <h4 className="apptDetailsHeader">Purpose of Visit</h4><h5 className="apptDetailsInfoText">{this.props.visitPurpose}</h5>
                    <h4 className="apptDetailsHeader">Tests Run</h4><h5 className="apptDetailsInfoText">{this.props.testsRun}</h5>
                    <h4 className="apptDetailsHeader">Diagnosis</h4><h5 className="apptDetailsInfoText">{this.props.diagnosis}</h5>
                    <h4 className="apptDetailsHeader">Next Appointment Date</h4><h5 className="apptDetailsInfoText">{this.props.nextAppointment}</h5>
                    <h4 className="apptDetailsHeader">Additional Appointment Notes</h4><h5 className="apptDetailsInfoText">{this.props.appointmentNotes}</h5>
                    <hr className="appointmentDetailsModalLine"></hr>
                   <h3 className="appointmentDetailsSubHeader">Appointment Prescriptions</h3>
                    <h4 className="apptDetailsHeader">Prescription Name</h4><h5 className="apptDetailsInfoText">{this.props.prescriptionName}</h5>
                    <h4 className="apptDetailsHeader">Dosage Details</h4><h5 className="apptDetailsInfoText">{this.props.prescriptionDosage}</h5>
                    <h4  className="apptDetailsHeader">Prescription Details</h4><h5 className="apptDetailsInfoText">{this.props.prescriptionDetails}</h5>
                
                    </section>
                </ModalBody>
                <ModalFooter>
                    <Button className="cancel" onClick={this.props.toggle}>
                        Close Details
					</Button>
                </ModalFooter>
            </>
        );
    }
}

export default ShowAppointmentDetails;
