
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditPrescriptionForm  from "./EditPrescriptionForm"
import "../prescriptions/prescription.css";
import {  Modal, ModalHeader, ModalBody } from "reactstrap";



class PrescriptionCard extends Component {

   state = {
   prescriptions: [],
   prescriptionName: "",
   prescriptionDosage: "",
   activePrescription: "false",
   prescriptionDetails: "",
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
        APIManager.delete("prescriptions", id)
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
                <div className="prescription-card">
                    <div className="card-content">
                        <h4>
                        hiiii this is the prescription card
                        {this.props.prescriptionName}
                        {this.props.prescriptionDosage}
                        {this.props.prescriptionDetails}
                        </h4>
                        <div>
                            {
                                parseInt(this.props.userId) === (this.activeUserId) ?
                                    <div>
                                        <button
                                            type="button" className="delete-prescription"
                                            onClick={() =>
                                                this.handleDelete(this.props.prescriptionId)}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-prescription"
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
                                Edit Prescription
                            </ModalHeader>
                            <ModalBody>
                            
                                <EditPrescriptionForm {...this.props}
                                    prescriptionId={this.props.prescriptionId}
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

export default PrescriptionCard;