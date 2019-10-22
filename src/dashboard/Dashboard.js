import React, { Component } from 'react';
import PrescriptionList from "../components/prescriptions/PrescriptionList"
import RecommendationList from "../components/recommendations/RecommendationList"
import AppointmentList from "../components/appointments/AppointmentList"
import YourProfileCard from "../components/yourProfile/YourProfileCard"
import HealthProfileCard from "../components/healthProfile/HealthProfileCard"

class Dashboard extends Component {
    render() {
        return (
            <div className="main">
            <section className="mainSection">
            <h1>hello</h1>
            </section>
            <section className="leftSection">
            <PrescriptionList {...this.props} />
            <RecommendationList {...this.props} />
            <AppointmentList {...this.props} />
            <YourProfileCard {...this.props} />
            <HealthProfileCard {...this.props} />
            </section>
        </div>

        )
    }
}

export default Dashboard;