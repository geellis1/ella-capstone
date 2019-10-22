
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./appointment.css"
import {  Modal, ModalHeader, ModalBody } from "reactstrap";
import EditAppointmentForm from "./EditAppointmentForm"

class AppointmentCard extends Component {

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
    }


    handleDelete = id => {
        APIManager.delete("appointments", id)
            .then(() => { this.props.getData() }
            );
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>
        );

        return (
            <>
                <div className="card">
                    <div className="card-content">
                        <h4>
                        hiiii this is the appointments card
                            {this.props.name}: {this.props.appointment}
                            <span className="card-messageTitle"></span>
                        </h4>
                        <div>
                            {
                                parseInt(this.props.userId) === (this.activeUserId) ?
                                    <div>
                                        <button
                                            type="button" className="delete-appointment"
                                            onClick={() =>
                                                this.handleDelete(this.props.appointmentId)}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-appointment"
                                            onClick={() => {
                                                this.toggle()
                                            }}
                                        >
                                            Edit
                                    </button>
                                    </div>
                                    : null
                            }
                        </div>

                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                Edit Appointment
                            </ModalHeader>
                            <ModalBody>
                                <EditAppointmentForm {...this.props}
                                    appointmentId={this.props.appointmentId}
                                    getData={this.props.getData}
                                    toggle={this.toggle} />
                            </ModalBody>


                        </Modal>

                    </div>
                </div>
            </>
        );
    }
}

export default AppointmentCard;