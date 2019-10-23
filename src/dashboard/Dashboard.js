import React, { Component } from 'react';
import PrescriptionList from "../components/prescriptions/PrescriptionList"
import RecommendationList from "../components/recommendations/RecommendationList"
import AppointmentList from "../components/appointments/AppointmentList"
import YourProfileCard from "../components/yourProfile/YourProfileCard"
import HealthProfileCard from "../components/healthProfile/HealthProfileCard"
import "../dashboard/dashboard.css";

class Dashboard extends Component {
    render() {
        return (
            <div className="mainBody">
            <section className="mainSection">
            <section className="welcome">
                <h1>this is the welcome section</h1>
            </section>
            <div className="health-prescriptions">
            <div className="healthProfile-container">
            <HealthProfileCard {...this.props} />
            </div>
            <PrescriptionList {...this.props} />
            </div>
            <div className="appointments-container">
            <AppointmentList {...this.props} />
            </div>
            </section>
            <section className="rightSection">
            <YourProfileCard {...this.props} />
            <RecommendationList {...this.props} />
            </section>
        </div>

        )
    }
}

export default Dashboard;