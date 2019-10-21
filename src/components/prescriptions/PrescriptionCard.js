
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditPrescriptionForm from "./EditPrescriptionForm"
import "../prescriptions/prescription.css";
import {  Modal, ModalHeader, ModalBody } from "reactstrap";



class PrescriptionCard extends Component {

    state = {
        name: "",
        chatMessage: "",
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handleDelete = id => {
        APIManager.delete("messages", id)
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
                            {this.props.name}: {this.props.message}
                            <span className="card-messageTitle"></span>
                        </h4>
                        <div>
                            {
                                parseInt(this.props.userId) === (this.activeUserId) ?
                                    <div>
                                        <button
                                            type="button" className="delete-message"
                                            onClick={() =>
                                                this.handleDelete(this.props.messageId)}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-message"
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
                                Edit Message
                            </ModalHeader>
                            <ModalBody>
                                <EditMessageCard {...this.props}
                                    messageId={this.props.messageId}
                                    name={this.props.name}
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