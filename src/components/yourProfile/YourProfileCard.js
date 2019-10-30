
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
        profileImageId: "",
        profileImages: "",
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
        const newState={}
        APIManager.get("users", this.activeUserId)
        .then(user => {newState.profileImageId = user.profileImageId
        return user } )
        .then((user) =>  APIManager.get("profileImages", user.profileImageId))
        .then((imageResponse) => newState.profileImages  = imageResponse)
        .then(() =>  APIManager.getUserPharmacy("pharmacy", this.state.activeUserId))
        .then((pharmacy) =>{
            if (pharmacy.length > 0)
            {
                newState.pharmacy = pharmacy[0]
                newState.pharmacyName = pharmacy[0].pharmacyName
                newState.pharmacyNumber = pharmacy[0].pharmacyNumber
            }
            else{
                return null
            }
        })
        .then(()  => this.setState(newState))


        // APIManager.get("users", this.activeUserId)
        //     .then(user => {
        //         APIManager.get("profileImages", user.profileImageId)
        //             .then(imageResponse => {
        //                 APIManager.getUserPharmacy("pharmacy", this.state.activeUserId)
        //                     .then(pharmacy => {
        //                         if (pharmacy.length > 0) {
        //                             this.setState({
        //                                 profileImages: imageResponse,
        //                                 profileImageId: user.profileImageId,
        //                                 pharmacy: pharmacy[0],
        //                                 pharmacyName: pharmacy[0].pharmacyName,
        //                                 pharmacyNumber: pharmacy[0].pharmacyNumber
        //                             })
        //                         }
        //                         else {
        //                             return null;
        //                         }
        //                     }
        //             )}
        //             )}
   }

render() {
    console.log("this is the pharmacy on the profile card", this.state.pharmacy)
    let activeUserName = sessionStorage.getItem("firstName")
    const closeBtn = (
        <button className="close" onClick={this.toggle}>
            &times;
            </button>
    );
    console.log("this is profile image id", this.state.profileImageId)
    return (
        <>
            <div className="yourProfile-header">
                <div className="card-content">
                    <h1 className="yourProfileHeaderText">your profile</h1>
                    <picture>
                        <img className="ellaProfileImg" src={this.state.profileImages.imgRoute} alt="ella logo" />
                    </picture><br></br>
                    <h2 className="profileName">{activeUserName}</h2><br></br>
                    <h3 className="profileHeader">Your Pharmacy:</h3><h4 className="profileInfo">{this.state.pharmacyName}</h4><br></br>
                    <h3 className="profileHeader">Pharmacy Number:</h3> <h4 className="profileInfo">{this.state.pharmacyNumber}</h4>
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
                                toggle={this.addToggle}
                            />
                        </ModalBody>
                    </Modal>
                    <span className="card-profile-card-title"></span>

                    <div>

                        {this.state.pharmacyName === "" ?
                            <Button className="addPharmacy" onClick={this.addToggle}>
                                <i class="fas fa-plus fa-1x"></i>

                                Add Pharmacy</Button>

                            : <button
                                type="button" className="edit-pharmacy"
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