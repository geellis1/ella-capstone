
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./appointment.css"
import {  Modal, ModalHeader, ModalBody } from "reactstrap";
import EditAppointmentForm from "./EditAppointmentForm"
import ShowAppointmentDetails from "./AppointmentDetails"
import ReactTooltip from 'react-tooltip'




class AppointmentCard extends Component {

   state = {
   appointments: [],
   prescriptions: [],
   appointmentNotes: "",
   appointmentDate: "",
   doctorName: "",
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
                <div className="bg"></div>
                    <div className="card-content">
                    <div className="appointmentCardContent">
                        <h4 className="appointmentDetails">
                            {this.props.appointmentDate}<br></br>
                            {this.props.doctorName}
                            <span className="card-messageTitle"></span>
                        </h4>
                        </div>
                        <div>
                            {
                                parseInt(this.props.userId) === (this.activeUserId) ?
                                    <div className="appointmentButtons">
                                    <button type="button" className="view-appointment" data-toggle="tooltip" title="Hooray!"
                                            onClick={() => {
                                                this.toggleDetailsModal()
                                            }}
                                        >
                                        <p data-tip="view more details"><i class="fas fa-info"></i></p>
                                        <ReactTooltip />

                                    </button>
                                    <button
                                            type="button" className="delete-appointment"
                                            onClick={() =>
                                                this.handleDelete(this.props.appointmentId)}
                                        >
                                        <i class="fas fa-trash-alt fa-1x"></i>
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-appointment"
                                            onClick={() => {
                                                this.toggleEditModal()
                                            }}
                                        >
                                        <i class="fas fa-edit fa-1x"></i>
                                            Edit
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
                                <picture>
                <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
              </picture>
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
                                <picture>
                <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
              </picture>
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