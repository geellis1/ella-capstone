// Purpose of the File: to house the routes/paths to each aspect of our app

import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login"
import Register from "./auth/Register"
import Dashboard from '../dashboard/Dashboard'



export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Dashboard user={this.props.user} {...props} />
            // Returns the component which will show the dashboard
          }}
        />

        <Route exact path="/login" render={props => {
          return <Login triggerRender={this.props.triggerRender} setUser={this.props.setUser} {...props} />
          // Returns the component which will show the login
        }} />

      <Route exact path="/register" render={props => {
          return <Register triggerRender={this.props.triggerRender} setUser={this.props.setUser} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
