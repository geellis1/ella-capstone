// Purpose of the file to hold add event form function

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from 'moment'


class AddHealthProfileForm extends Component {
    moment =  require('moment');
    date = moment().format('LLL');
//set the initial state
    state = {
    bloodType: "",
    weight: "",
    height: "",
    allergies: "",
    userId: "",
    id: [],
    dateUpdated: this.date,
    modal: false,
    loadingStatus: true,
    activeUser: parseInt(sessionStorage.getItem("userId"))
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

    addHealthProfile = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.bloodType === "" || this.state.height === "") {
            window.alert("Please input your blood type and height");
        } else {
            this.setState({ loadingStatus: true });
            const addedHealthProfile = {
                userId: this.activeUserId,
                bloodType: this.state.bloodType,
                height: this.state.height,
                weight: this.state.weight,
                allergies: this.state.allergies
            };

            APIManager.post("healthProfile", addedHealthProfile)
                .then((res) => {
                    this.props.getData()
                }
                );
        };
    }

    componentDidMount() {
        APIManager.getAll("healthProfile", this.state.activeUserId).then(health => {
            this.setState({
                health: health
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
            <ModalBody>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <h2>Today's Date: {this.state.dateUpdated}</h2>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="bloodType"
                                defaultValue={this.state.bloodType}
                            />
                            <label htmlFor="bloodType">What is your blood type?</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="height"
                                defaultValue={this.state.height}
                            />
                            <label htmlFor="height">what is your height?</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="weight"
                                defaultValue={this.state.weight}
                            />
                            <label htmlFor="weight">what is your weight?</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="allergies"
                                defaultValue={this.state.allergies}
                            />
                            <label htmlFor="allergies">What allergies do you have?</label>
                        </div>
                        <div className="alignRight"></div>
                    </fieldset>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    onClick={evt => {
                        this.addHealthProfile(evt);
                        this.props.toggle();
                    }}
                    className="btn btn-primary"
                >
                    Add
                </Button>{" "}
                <Button className="cancel" onClick={this.toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </>
    );
}
}

export default AddHealthProfileForm;