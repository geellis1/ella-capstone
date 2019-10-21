// Purpose of the file to display all prescriptions

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import AddPrescriptionForm from "./AddPrescriptionForm"
import PrescriptionCard from "./PrescriptionCard"
import "../prescriptions/prescription.css";


class PrescriptionList extends Component {
  //define what this component needs to render
   state = {
   prescriptions: [],
   medicineName: "",
   medicineDosage: "",
   activePrescription: "false",
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
      APIManager.getAll("prescriptions", null).then(newPrescriptions => {
        this.setState({
          prescriptions: newPrescriptions
        });
      });
    });
  };

  getData = () => APIManager.getAllPrescriptions("prescriptions").then(prescriptions => {
    this.setState({
      prescriptions: prescriptions
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAllPrescriptions("prescriptions").then(prescriptions => {
      this.setState({
        prescriptions: prescriptions
      });
    });
  }

  render() {
    return (
      <>
    <h1>Messages</h1>
    
     <AddPrescriptionForm {...this.props}
      getData={this.getData}
     />

        <div className="prescription-container-cards">
          {this.state.prescriptions.map(prescription => (
            <PrescriptionCard
              key={prescription.id}
              prescriptionId={prescription.id}
              prescription={message.chatMessage}
              userId={message.userId}
              name={message.userName}
              deletePrescription={this.deletePrescription}
              {...this.props}
              getData={this.getData}
            />
          ))}
        </div>
                </div>
      </>
    );
  }
}

export default MessageList;
