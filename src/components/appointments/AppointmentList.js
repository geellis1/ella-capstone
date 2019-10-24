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

  getData = () => APIManager.getAll("appointments").then(appointments => {
    this.setState({
      appointments: appointments
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("appointments").then(appointments => {
      this.setState({
        appointments: appointments
      });
    });
  }

  render() {
    return (
      <>
      <div className = "appointment-header">
    <h1>Appointments</h1>

     <AddAppointmentForm {...this.props}
      getData={this.getData}
      triggerRender =  {this.props.triggerRender}
     />
     </div>

        <div className="appointment-container-cards">
          {this.state.appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointmentId={appointment.id}
              appointmentNotes={appointment.appointmentNotes}
              userId={appointment.userId}
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
