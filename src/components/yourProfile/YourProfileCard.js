
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditPharmacyForm from "./EditYourPharmacyForm"
import "../yourProfile/yourProfile.css";
import {  Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";



class ProfileCard extends Component {

   state = {
   pharmacy: {},
   userId: "",
   activeUserId: parseInt(sessionStorage.getItem("userId")),
   modal: false
    };



    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    getData = () => APIManager.getUserPharmacy("pharmacy", this.state.activeUserId).then(pharmacy => {
        this.setState({
          pharmacy: pharmacy[0]
        })
      });

    componentDidMount() {
        APIManager.getUserPharmacy("pharmacy", this.state.activeUserId).then(pharmacy => {
          console.log(pharmacy)
            this.setState({
            pharmacy: pharmacy[0]
          });
        });
      }

    render() {
        console.log("this is the pharmacy on the profile card", this.state.pharmacy)
        let activeUserName = sessionStorage.getItem("firstName")
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>
        );

        return (
            <>
                <div className="your-profile-card">
                    <div className="card-content">
                        <h2>
                        hiiii this is the profile card
                            {this.state.pharmacy.pharmacyName}
                            {this.state.pharmacy.pharmacyNumber}
                            {activeUserName}
                            <span className="card-profile-card-title"></span>
                        </h2>
                        <div>

                                    <div>

                                        <button
                                            type="button" className="edit-pharmacy"
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
                                Edit Pharmacy Info
                            </ModalHeader>
                            <ModalBody>
                            
                                <EditPharmacyForm {...this.props}
                                    pharmacy={this.state.pharmacy}
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

export default ProfileCard;