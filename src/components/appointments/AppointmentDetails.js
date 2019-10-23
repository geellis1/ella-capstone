import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import "./appointment.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ShowAppointmentDetails extends Component {
    //set the initial state
    state = {
        appointments: [],
        appointmentNotes: "",
        userId: "",
        modal: false,
        loadingStatus: true,
        modal: false,
        activeUser: parseInt(sessionStorage.getItem("userId"))
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

componentDidMount() {
        return APIManager.get("appointments", this.props.appointmentId)
            .then(
                appointment => {
                    this.setState({
                        appointmentNotes: appointment.appointmentNotes,
                        loadingStatus: false,
                    });
                });
    };

    render() {
        return (
            <>
 <ModalBody>
                    hello this is a modal test
				</ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={evt => {
                            this.props.toggle(evt);
                        }}
                        className="btn btn-primary"
                    >
                        Submit
					</Button>
                    <Button className="cancel" onClick={this.props.toggle}>
                        Cancel
					</Button>
                </ModalFooter>
                </>
         )
    }}

        export default ShowAppointmentDetails;
