
// Purpose of the file to display individual prescriptions on the dashboard
import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import EditPharmacyForm from "./EditYourPharmacyForm"
import AddPharmacyForm from "./AddYourPharmacyForm"
import "../yourProfile/yourprofile.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";



class ProfileCard extends Component {

    state = {
        pharmacy: {},
        pharmacyName: "",
        pharmacyNumber: "",
        userId: "",
        activeUserId: parseInt(sessionStorage.getItem("userId")),
        addModal: false,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))



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

    getData = () => APIManager.getUserPharmacy("pharmacy", this.state.activeUserId).then(pharmacy => {
        console.log("ProfileCard: this.getData", pharmacy)
        this.setState({
            pharmacy: pharmacy[0],
            pharmacyName: pharmacy[0].pharmacyName,
            pharmacyNumber: pharmacy[0].pharmacyNumber
        })
    });

    componentDidMount() {
        APIManager.getUserPharmacy("pharmacy", this.state.activeUserId)
            .then(pharmacy => {
                if (pharmacy.length > 0) {
                    this.setState({
                        pharmacy: pharmacy[0],
                        pharmacyName: pharmacy[0].pharmacyName,
                        pharmacyNumber: pharmacy[0].pharmacyNumber
                    })
                }
                else {
                    return null;
                }
            })
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
                        <h2>hiiii this is the profile card</h2>
                            <Modal
                            isOpen={this.state.addModal}
                            toggle={this.addToggle}
                            className={this.props.className}
                            >
                            <ModalHeader
                                toggle={this.toggle}
                                close={closeBtn}>
                                Add Pharmacy Info
                            </ModalHeader>
                            <ModalBody>
                            <AddPharmacyForm {...this.props}
                                getData={this.getData}
                                toggle = {this.addToggle}
                            />
                            </ModalBody>
                            </Modal>

                            {this.state.pharmacyName}
                            {this.state.pharmacyNumber}
                            {activeUserName}
                            <span className="card-profile-card-title"></span>

                            <div>

                            {this.state.pharmacyName === "" ?
                            <Button className="addPharmacy" onClick={this.addToggle}>
                    Add Pharmacy</Button>

                                : <button
                                    type="button" className="edit-pharmacy"
                                    onClick={() => {
                                        this.toggle()
                                    }}
                                >
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