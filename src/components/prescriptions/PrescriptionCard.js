
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
console.log(this.props.prescriptionName)
        return (
            <>
                <div className="prescription-card">
                    <div className="card-content">
                    <section className="detailsCardImage">
                    <div className="prescriptionIcon" id="grad">
                    <i class="fas fa-prescription-bottle-alt fa-3x"></i>
                    </div>
                    <div className="prescriptionCardOutput">
                        <h2 className="prescriptionHeader">Prescription Name:</h2><h3 className="prescriptionDetailsText">{this.props.prescriptionName}</h3>
                        <h2 className="prescriptionHeader">Dosage Details:</h2><h3 className="prescriptionDetailsText">{this.props.prescriptionDosage}</h3>
                        <h2 className="prescriptionHeader">Notes:</h2><h3 className="prescriptionDetailsText">{this.props.prescriptionDetails}</h3>
                        </div>
                        </section>
                        <div>

                                    <div>
                                    <div className="prescriptionCardButtons">
                                        <button
                                            type="button" className="delete-prescription"
                                            onClick={() =>
                                                this.handleDelete(this.props.prescriptionId)}
                                        >
                                        <i class="fas fa-trash-alt fa-1x"></i>
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-prescription"
                                            onClick={() => {
                                                this.toggle()
                                            }}
                                        >
                                        <i class="fas fa-edit fa-1x"></i>
                                            Edit
                                    </button>
                                    </div>
                                    </div>

                        </div>

                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                <h1>Edit Prescription</h1>
                                <picture>
                <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
              </picture>
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