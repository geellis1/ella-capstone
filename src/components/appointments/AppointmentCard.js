
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./appointment.css"
import {  Modal, ModalHeader, ModalBody } from "reactstrap";
import EditAppointmentForm from "./EditAppointmentForm"
import ShowAppointmentDetails from "./AppointmentDetails"

class AppointmentCard extends Component {

   state = {
   appointments: [],
   prescriptions: [],
   appointmentNotes: "",
   userId: "",
   editModal: false,
   detailsModal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggleEditModal = () => {
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    }

    toggleDetailsModal = () => {
        this.setState(prevState => ({
            detailsModal: !prevState.detailsModal
        }));
    }


    handleDelete = id => {
        APIManager.delete("appointments", id)
            .then(() => { this.props.getData() }
            );
    }

    render() {
        const closeBtnEdit = (
            <button className="close" onClick={this.toggleEditModal}>
                &times;
            </button>

        );
        const closeBtnDetails = (
            <button className="close" onClick={this.toggleDetailsModal}>
                &times;
            </button>

        );

        return (
            <>
                <div className="appointment-card">
                    <div className="card-content">
                        <h4>
                            {this.props.appointmentNotes}
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
                                                this.toggleEditModal()
                                            }}
                                        >
                                            Edit
                                    </button>
                                    <button
                                            type="button" className="view-appointment"
                                            onClick={() => {
                                                this.toggleDetailsModal()
                                            }}
                                        >
                                            View More Details
                                    </button>
                                    </div>
                                    : null
                            }
                        </div>
                        <Modal
                            isOpen={this.state.editModal}
                            toggle={this.toggleEditModal}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggleEditModal}
                                close={closeBtnEdit}>
                                Edit Appointment
                            </ModalHeader>
                            <ModalBody>
                                <EditAppointmentForm {...this.props}
                                    appointmentId={this.props.appointmentId}
                                    getData={this.props.getData}
                                    toggle={this.toggleEditModal} />
                            </ModalBody>
                    </Modal>

                    <Modal
                            isOpen={this.state.detailsModal}
                            toggle={this.toggleDetailsModal}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggleDetailsModal}
                                close={closeBtnDetails}>
                                View Appointment
                            </ModalHeader>
                            <ModalBody>
                                <ShowAppointmentDetails {...this.props}
                                    appointmentId={this.props.appointmentId}
                                    getData={this.props.getData}
                                    toggle={this.toggleDetailsModal} />
                            </ModalBody>
                    </Modal>

                    </div>
                </div>
            </>
        );
    }
}

export default AppointmentCard;