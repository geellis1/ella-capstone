// Purpose of the file to display all prescriptions

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import AddPrescriptionForm from "./AddPrescriptionForm"
import PrescriptionCard from "./PrescriptionCard"
import "../prescriptions/prescription.css";


class PrescriptionList extends Component {
  //define what this component needs to render
  state = {
    prescriptions: [],
    prescriptionName: "",
    prescriptionDosage: "",
    prescriptionDetails: "",
    userId: "",
    modal: false
  };

  activeUserId = parseInt(sessionStorage.getItem("userId"))

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  deleteMessage = id => {
    APIManager.delete("prescriptions", id).then(() => {
      APIManager.getAll("prescriptions").then(newPrescriptions => {
        this.setState({
          prescriptions: newPrescriptions
        });
      });
    });
  };

  getData = () => APIManager.getUserPrescription("prescriptions", this.activeUserId).then(prescriptions => {
    this.setState({
      prescriptions: prescriptions
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getUserPrescription("prescriptions", this.activeUserId).then(prescriptions => {
      this.setState({
        prescriptions: prescriptions
      });
    });
  }

  render() {
    return (
      <>
        <div className="prescription-header">
          <h1>prescriptions</h1>


          <AddPrescriptionForm {...this.props}
            getData={this.getData}
          /></div>
  
          {this.state.prescriptions.map(prescription => (
            <PrescriptionCard
              key={prescription.id}
              prescriptionId={prescription.id}
              prescriptionName={prescription.prescriptionName}
              userId={prescription.userId}
              prescriptionDetails={prescription.prescriptionDetails}
              prescriptionDosage={prescription.prescriptionDosage}
              deletePrescription={this.deletePrescription}
              {...this.props}
              getData={this.getData}
            />
          ))}
      </>
    );
  }
}

export default PrescriptionList;
