
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./recommendation.css"
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EditRecommendationForm from "./EditRecommendationForm"

class RecommendationCard extends Component {

    state = {
        recommendations: [],
        nameOfDoctor: "",
        recommendationDetails: "",
        personRecommended: "",
        doctors: [],
        doctor: "",
        doctorId: "1",
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
        APIManager.delete("recommendations", id)
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
                <div className="recommendation-card">
                    <div className="card-content">
                        <h4>
                        <h2 className="prescriptionHeader">Doctor Name:</h2><h3 className="prescriptionDetailsText">{this.props.nameOfDoctor}</h3>
                        <h2 className="prescriptionHeader">Recommendation Details:</h2><h3 className="prescriptionDetailsText">{this.props.recommendationDetails}</h3>
                        <h2 className="prescriptionHeader">Who Recommended?:</h2> <h3 className="prescriptionDetailsText">{this.props.personRecommended}</h3>  
                        <h2 className="prescriptionHeader">Type of Doctor:</h2><h3 className="prescriptionDetailsText">    {this.props.doctorId}</h3>  
                         
                            <span className="card-messageTitle"></span>
                        </h4>
                        <div>
                            {
                                parseInt(this.props.userId) === (this.activeUserId) ?
                                    <div>
                                        <button
                                            type="button" className="delete-recommendation"
                                            onClick={() =>
                                                this.handleDelete(this.props.recommendationId)}
                                        >
                                        <i class="fas fa-trash-alt fa-1x"></i>
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-recommendation"
                                            onClick={() => {
                                                this.toggle()
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
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                Edit Recommendation
                            </ModalHeader>
                            <ModalBody>
                                <EditRecommendationForm {...this.props}
                                    recommendationId={this.props.recommendationId}
                                    getData={this.props.getData}
                                    toggle={this.toggle} />
                            </ModalBody>


                        </Modal>

                    </div>
                    <hr></hr>
                </div>
            </>
        );
    }
}

export default RecommendationCard;