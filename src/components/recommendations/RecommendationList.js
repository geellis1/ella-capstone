// Purpose of the file to display all prescriptions

import React, { Component } from "react";
import APIManager from "../modules/APIManager"
import AddRecommendationForm from "./AddRecommendationForm"
import RecommendationCard from "./RecommendationCard"
import "../recommendations/recommendation.css";


class RecommendationList extends Component {
  //define what this component needs to render
   state = {
    recommendations: [],
    nameOfDoctor: "",
    recommendationDetails: "",
    personRecommended: "",
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
    APIManager.delete("recommendations", id).then(() => {
      APIManager.getAll("recommendations").then(newRecommendations => {
        this.setState({
          recommendations: newRecommendations
        });
      });
    });
  };

  getData = () => APIManager.getAll("recommendations").then(recommendations => {
    this.setState({
      recommendations: recommendations
    })
  });

  componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("recommendations").then(recommendations => {
      this.setState({
        recommendations: recommendations
      });
    });
  }

  render() {
    return (
      <>
    <div className = "recommendations-header">
    <h1>Recommendations</h1>

     <AddRecommendationForm {...this.props}
      getData={this.getData}
     />
     </div>

        <div className="recommendation-container-cards">
          {this.state.recommendations.map(recommendation => (
            <RecommendationCard
              key={recommendation.id}
              recommendationId={recommendation.id}
              nameOfDoctor={recommendation.nameOfDoctor}
              userId={recommendation.userId}
              recommendationDetails={recommendation.recommendationDetails}
              personRecommended={recommendation.personRecommended}
             deleteRecommendation={this.deleteRecommendation}
              {...this.props}
              getData={this.getData}
            />
          ))}
        </div>
      </>
    );
  }
}

export default RecommendationList;
