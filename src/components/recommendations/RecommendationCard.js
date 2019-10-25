
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
                            hiiii this is the recommendations card
                        {this.props.nameOfDoctor}
                            {this.props.recommendationDetails}
                            {this.props.personRecommended}
                            {this.props.doctorId}
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
                                            Delete
                                        </button>

                                        <button
                                            type="button" className="edit-recommendation"
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
                </div>
            </>
        );
    }
}

export default RecommendationCard;