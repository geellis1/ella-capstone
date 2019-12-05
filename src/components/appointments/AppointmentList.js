// Purpose of the file to display all prescriptions

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import AddAppointmentForm from "./AddAppointmentForm"
import AppointmentCard from "./AppointmentCard"
import "../appointments/appointment.css";


class AppointmentList extends Component {
  //define what this component needs to render
   state = {
   appointments: [],
   appointmentNotes: "",
   appointmentDate: "",
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
   doctorName: "",
   doctor: "",
   prescription: "",
  doctorId: "1",
  typeOfDoctor: "",
  doctors: [],
  prescriptions: [],
  prescriptionName: "",
  prescriptionDosage: "",
  prescriptionDetails: "",
  userId: "",
  modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("userId"))

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteAppointment = id => {
    APIManager.delete("appointments", id).then(() => {
      APIManager.getAll("appointments").then(newAppointments => {
        this.setState({
          appointments: newAppointments
        });
      });
    });
  };

  getData = () => APIManager.getUserAppointment("appointments",  this.activeUserId).then(appointments => {
    this.setState({
      appointments: appointments
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getUserAppointment("appointments", this.activeUserId).then(appointments => {
      this.setState({
        appointments: appointments
      });
    });
  }

  render() {
    return (
      <>
      <div className = "appointment-header">
    <h1>appointments</h1>
</div>
     <AddAppointmentForm {...this.props}
      getData={this.getData}
      triggerRender =  {this.props.triggerRender}
     />

        <div className="appointment-container-cards">
          {this.state.appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointmentId={appointment.id}
              appointmentNotes={appointment.appointmentNotes}
              officeAddress={appointment.officeAddress}
              doctorNotes={appointment.doctorNotes}
              visitPurpose={appointment.visitPurpose}
              testsRun={appointment.testsRun}
              diagnosis={appointment.diagnosis}
              nextAppointment={appointment.nextAppointment}
              appointmentDate={appointment.appointmentDate}
              doctorName={appointment.doctorName}
              doctorId={appointment.doctor.typeOfDoctor}
              userId={appointment.userId}
              prescriptionId={appointment.id}
              prescriptionName={appointment.prescriptionName}
              prescriptionDetails={appointment.prescriptionDetails}
              prescriptionDosage={appointment.prescriptionDosage}
              deleteAppointment={this.deleteAppointment}
             triggerRender =  {this.props.triggerRender}
              {...this.props}
              getData={this.getData}
            />
          ))}
        </div>
      </>
    );
  }
}

export default AppointmentList;
