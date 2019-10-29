
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditHealthProfileForm from "./EditHealthProfileForm"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import moment from 'moment'
import AddHealthProfileForm from './AddHealthProfileCard'
import "../healthProfile/healthprofile.css";



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

    addToggle = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal
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
            if(healthProfile.length >  0)  {
            console.log(healthProfile)
            this.setState({
                healthProfile: healthProfile[0],
                height: healthProfile[0].height,
                weight: healthProfile[0].weight,
                allergies: healthProfile[0].allergies})}
            else
            {
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

        return (
            <>
                <div className="health-profile-card">
                    <div className="card-content">
                    <h1 className="healthProfileHeaderText">your health info</h1>
                            <h3 className="healthProfileHeader">Blood Type:</h3><h4 className="healthProfileInfo">{this.state.bloodType}</h4>
                            <h3 className="healthProfileHeader">Height:</h3><h4 className="healthProfileInfo">{this.state.height}</h4>
                            <h3 className="healthProfileHeader">Weight:</h3><h4 className="healthProfileInfo">{this.state.weight}</h4>
                            <h3 className="healthProfileHeader">Allergies:</h3><h4 className="healthProfileInfo">{this.state.allergies}</h4>
                            <h3  className="healthProfileHeaderUpdate">Last Updated: {this.state.dateUpdated}</h3>
                            <span className="card-profile-card-title"></span>
                        <div>
                        </div>
                        <Modal
                            isOpen={this.state.addModal}
                            toggle={this.addToggle}
                            className={this.props.className}
                            >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                Add Profile Info
                            </ModalHeader>
                            <ModalBody>
                            <AddHealthProfileForm {...this.props}
                                getData={this.getData}
                                toggle = {this.addToggle}
                            />
                            </ModalBody>
                            </Modal>
                            <div>

                            {this.state.height === "" ?
                            <Button className="addHealthProfile" onClick={this.addToggle}>
                            <i class="fas fa-plus fa-1x"></i>
                    Add Health Profile</Button>

                                : <button
                                    type="button" className="edit-healthProfile"
                                    onClick={() => {
                                        this.toggle()
                                    }}
                                >
                                <i class="fas fa-edit fa-1x"></i>
                                    Edit
                                    </button>}
                            </div>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                <h1>Edit Health Profile</h1>
                            <picture>
                <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
              </picture>
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