import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import "../nav/navbar.css";

class NavBar extends Component {

  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

  logOut = (event) => {
    this.props.clearUser()
    this.props.triggerRender()
    this.props.history.push("/login")
  }

  render() {
    return (
      <>
        {(this.props.user) ?
          <nav className="navbar">
            <div className="logoimg">
              <picture >
                <img className="logo" src={require('../../images/ellalogofinal-02.png')} alt="ella logo" />
              </picture>
            </div>
            <ul className="nav nav-pills nav-fill">
            <li><span className="nav-link" onClick={this.logOut}>Logout</span></li>
            </ul>
          </nav>
          : null}
          </>
    )
  }
}

export default withRouter(NavBar);