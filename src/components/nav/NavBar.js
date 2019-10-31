import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            <div className="logoImgNav">
              <picture>
                <img className="logo" src={require('../../images/ellalogofinal-02.png')} alt="ella logo" />
              </picture>
            </div>

            <Button className="logOut" onClick={this.logOut}>
            <i class="fas fa-sign-out-alt fa-1x"></i>
            Logout
						</Button>
          </nav>
          : null}
          </>

    )
  }
}

export default withRouter(NavBar);