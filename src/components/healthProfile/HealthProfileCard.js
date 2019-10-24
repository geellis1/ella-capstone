
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditHealthProfileForm from "./EditHealthProfileForm"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import moment from 'moment'



class HealthProfileCard extends Component {
    moment =  require('moment');
    date = moment().format('LLL');

    state = {
        healthProfile: {},
        bloodType: "",
        height: "",
        weight: "",
        allergies: "",
        dateUpdated: this.date,
        userId: "",
        activeUserId: parseInt(sessionStorage.getItem("userId")),
        modal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    getData = () => APIManager.getUserHealth("healthProfile", this.state.activeUserId).then(healthProfile => {
        this.setState({
            healthProfile: healthProfile[0]
        })
    });

    componentDidMount() {
        APIManager.getUserHealth("healthProfile", this.state.activeUserId).then(healthProfile => {
            console.log(healthProfile)
            this.setState({
                healthProfile: healthProfile[0]
            });
        });
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>
        );

        return (
            <>
                <div className="health-profile-card">
                    <div className="card-content">

                            <h2>Blood Type:</h2><p>{this.state.healthProfile.bloodType}</p>
                            <h2>Height:</h2><p>{this.state.healthProfile.height}</p>
                            <h2>Weight:</h2><p>{this.state.healthProfile.weight}</p>
                            <h2>Allergies:</h2><p>{this.state.healthProfile.allergies}</p>
                            <h2>Last Update: {this.state.dateUpdated}</h2>
                            <span className="card-profile-card-title"></span>
                        <div>

                            <div>

                                <button
                                    type="button" className="edit-health"
                                    onClick={() => {
                                        this.toggle()
                                    }}
                                >
                                    Edit
                                    </button>
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
                                Edit Health Profile
                            </ModalHeader>
                            <ModalBody>

                                <EditHealthProfileForm {...this.props}
                                    healthProfile={this.state.healthProfile}
                                    getData={this.getData}
                                    activeUserId={this.state.activeUserId}
                                    toggle={this.toggle} />
                            </ModalBody>


                        </Modal>

                    </div>
                </div>
            </>
        );

    }
}

export default HealthProfileCard;