import React, { Component } from 'react';
import PrescriptionList from "../components/prescriptions/PrescriptionList"
import RecommendationList from "../components/recommendations/RecommendationList"
import AppointmentList from "../components/appointments/AppointmentList"
import YourProfileCard from "../components/yourProfile/YourProfileCard"
import HealthProfileCard from "../components/healthProfile/HealthProfileCard"
import "../dashboard/dashboard.css";


// trigger re-render is here and then set state and then the .then or trigger re-render when you hit save on add appointment form to
// trigger  re-render on dashboard



class Dashboard extends Component {
    state =  {
        dashboard: true
    }
    triggerRender = () => {
        if (this.state.dashboard  === true)
        {
            this.setState({dashboard: false})
        }
        else{
            this.setState({dashboard: true})
        }
    }

    render() {
        console.log(this.triggerRender)
        let activeUserName = sessionStorage.getItem("firstName")
        return (
            <div className="mainBody">
            <section className="mainSection">
            <section className="welcome">
                <div className="logoimg">
              <picture>
                <img className="ellaWelcome" src={require("../images/ellawelcomeimage.png")} alt="ella logo" />
              </picture>
              </div>
              <h1 className="dashboardWelcome">hello, {activeUserName}! <br></br>we're glad you are here.</h1>
            
            </section>
            <div className="health-prescriptions">
            <div className="healthProfile-container">
            <HealthProfileCard key={this.state.dashboard}{...this.props} />
            </div>
            <div className="prescriptions-container">
            <PrescriptionList key={this.state.dashboard}{...this.props} />
            </div>
            </div>
            <div className="appointments-container">
            <AppointmentList {...this.props}triggerRender={this.triggerRender} />
            </div>
            </section>
            <section className="rightSection">
            <div className="yourProfile-container">
            <YourProfileCard {...this.props} />
            </div>
            <div className="recommendations-container">
            <RecommendationList {...this.props} />
            </div>
            </section>
        </div>

        )
    }
}

export default Dashboard