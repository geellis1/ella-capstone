// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddRecommendationForm extends Component {


    //set the initial state
    state = {
        nameOfDoctor: "",
        recommendationDetails: "",
        personRecommended: "",
        userId: "",
        id: [],
        doctors: [],
        doctor: "",
        doctorId: "1",
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addRecommendation = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.nameOfDoctor === "" || this.state.personRecommended === "") {
            window.alert("Please input a recommendation");
        } else {
            this.setState({ loadingStatus: true });
            const addedRecommendation = {
                userId: this.activeUserId,
                nameOfDoctor: this.state.nameOfDoctor,
                recommendationDetails: this.state.recommendationDetails,
                personRecommended: this.state.personRecommended,
                doctorId: this.state.doctorId,
            };

            APIManager.post("recommendations", addedRecommendation)
                .then(() => { this.props.getData() }
                );
        };
    }
    componentDidMount() {
        APIManager.getAll("doctors", this.state.activeUserId).then(doctors => {
            console.log(doctors)
            this.setState({
                doctors: doctors
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
                {" "}
                <Button className="addRecommendation" onClick={this.toggle}>
                <i class="fas fa-plus fa-1x"></i>
                    Add Recommendation</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        <h1 className="modalHeaders">Create Recommendation</h1>
                        <picture>
                <img className="editHealthProfileModalHeader" src={require("../../images/edithealthprofile.png")} alt="ella logo" />
              </picture>
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label className="editHealth" htmlFor="nameOfDoctor">
                                        Doctor name:
									</label>
                                    <input className="health-input"
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="nameOfDoctor"
                                        value={this.state.nameOfDoctor}
                                    />

                                    <label className="editHealth" htmlFor="recommendationDetails">Details on Recommendation</label>
                                    <input className="health-input"
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="recommendationDetails"
                                        value={this.state.recommendationDetails}
                                    />

                                    <label className="editHealth" htmlFor="personRecommended">Who recommended? </label>
                                    <input className="health-input"
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="personRecommended"
                                        value={this.state.personRecommended}
                                    />
                                    <label className="editHealth" htmlFor="typeOfDoctor">Type of Doctor</label><br></br>
                                    <select
                                        defaultValue="1"
                                        name="doctors"
                                        id="doctorId"
                                        onChange={this.handleFieldChange}>
                                        {this.state.doctors.map(doctor =>
                                            <option className="var" key={doctor.id}  value={doctor.id} >
                                                {doctor.typeOfDoctor}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className="alignRight">
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
className="add"
                            onClick={this.addRecommendation}
                        >
                            Add
						</Button>{" "}
                        <Button className="cancel" onClick={this.toggle}>
                            Cancel
						</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default AddRecommendationForm;