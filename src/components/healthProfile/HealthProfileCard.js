
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditHealthProfileForm from "./EditHealthProfileForm"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import moment from 'moment'
import AddHealthProfileForm from './AddHealthProfileCard'
import "../healthProfile/healthprofile.css";



class HealthProfileCard extends Component {
    moment = require('moment');
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
        modal: false,
        addModal: false,
        editModal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    addToggle = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal
        }));
    }

    editToggle = () => {
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    }

    getData = () => APIManager.getUserHealth("healthProfile", this.state.activeUserId).then(healthProfile => {
        this.setState({
            healthProfile: healthProfile[0],
            bloodType: healthProfile[0].bloodType,
            weight: healthProfile[0].weight,
            height: healthProfile[0].height,
            allergies: healthProfile[0].allergies
        })
    });

    componentDidMount() {
        APIManager.getUserHealth("healthProfile", this.state.activeUserId)
            .then(healthProfile => {
                if (healthProfile.length > 0) {
                    console.log(healthProfile)
                    this.setState({
                        healthProfile: healthProfile[0],
                        height: healthProfile[0].height,
                        weight: healthProfile[0].weight,
                        allergies: healthProfile[0].allergies
                    })
                }
                else {
                    return null;
                }
            })
    }


    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>
        );

        const addCloseBtn = (
            <button className="close" onClick={this.addToggle}>
                &times;
            </button>
        );

        return (
            <>
                <div className="health-profile-card">
                    <div className="card-content">
                        <h1 className="healthProfileHeaderText">your health info</h1>
                        <div>

                            {this.state.height === "" ?
                                <Button className="addHealthProfile" onClick={this.addToggle}>
                                    <i class="fas fa-plus fa-1x"></i>
                                    Add Health Profile</Button>

                                : <button
                                    type="button" className="edit-healthProfile"
                                    onClick={() => {
                                        this.editToggle()
                                    }}
                                >
                                    <i class="fas fa-edit fa-1x"></i>
                                    Edit
        </button>}
                        </div>
                        <div className="bloodTypeContainer">
                                <img className="bloodIcon" src={require("../../images/bloodtypeicon-01.png")} alt="ella logo" />
                            <h2 className="prescriptionHeader">Blood Type:</h2><h4 className="healthProfileInfoDetails">{this.state.bloodType}</h4>
                        </div>
                        <hr className="profileCardLine"></hr>
                        <div className="heightTypeContainer">
                        <img className="heightIcon" src={require("../../images/heighticon-01.png")} alt="ella logo" />
                        <h2 className="prescriptionHeader">Height:</h2><h4 className="healthProfileInfoDetails">{this.state.height}</h4>
                        </div>
                        <hr className="profileCardLine"></hr>
                        <div className="weightTypeContainer">
                        <img className="weightIcon" src={require("../../images/weighticon-01.png")} alt="ella logo" />
                        <h2 className="prescriptionHeader">Weight:</h2><h4 className="healthProfileInfoDetails">{this.state.weight}</h4>
                        </div>
                        <hr className="profileCardLine"></hr>
                        <div className="allergyTypeContainer">
                        <img className="allergyIcon" src={require("../../images/allergiesicon-01.png")} alt="ella logo" />
                        <h2 className="prescriptionHeader">Allergies:</h2><h4 className="healthProfileInfoDetails">{this.state.allergies}</h4>
                        </div>
                        <hr className="profileCardLine"></hr>
                        <h2 className="prescriptionHeader">Last Updated:<br></br><em>{this.state.dateUpdated}</em></h2>
                        <span className="card-profile-card-title"></span>
                        <div>
                        </div>
                        <Modal
                            isOpen={this.state.addModal}
                            toggle={this.addToggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggle} close={addCloseBtn}>
                                Add Profile Info
                                <picture>
                                    <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
                                </picture>
                            </ModalHeader>
                            <ModalBody>
                                <AddHealthProfileForm {...this.props}
                                    getData={this.getData}
                                    addToggle={this.addToggle}
                                />
                            </ModalBody>
                        </Modal>
                        <Modal
                            isOpen={this.state.editModal}
                            toggle={this.editToggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.editToggle}
                                close={closeBtn}>
                                <h1 className="modalHeaders">Edit Health Profile</h1>
                                <picture>
                                    <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
                                </picture>
                            </ModalHeader>
                            <ModalBody>

                                <EditHealthProfileForm {...this.props}
                                    healthProfile={this.state.healthProfile}
                                    getData={this.getData}
                                    activeUserId={this.state.activeUserId}
                                    toggle={this.editToggle} />
                            </ModalBody>


                        </Modal>

                    </div>
                </div>
            </>
        );

    }
}

export default HealthProfileCard;