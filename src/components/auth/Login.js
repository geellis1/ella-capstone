import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Register from "./Register"
import "./auth.css";
import APIManager from "../modules/APIManager"

//Reactstrap Modal code from line 10 to 21
class Login extends Component {

    // Set initial state

    state = {
        firstName: "",
        email: "",
        password: "",
        userId: "",
        modal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getAll("users").then((users) => {
            let singleUser = users.find(
                user =>
                    user.password.toLowerCase() === this.state.password.toLowerCase() &&
                    user.email.toLowerCase() === this.state.email.toLowerCase()
            );
            if (this.state.email === "") {
                window.alert("Please enter email")
            } else if (this.state.password === "") {
                window.alert("Please enter password")
            } else if (singleUser) {
                sessionStorage.setItem("userId", singleUser.id);
                sessionStorage.setItem("email", this.state.email);
                sessionStorage.setItem("firstName", singleUser.firstName);
                this.props.triggerRender();
                this.props.history.push("/");
            } else {
                window.alert("Credentials do not match")
            }

        })
    }


    //Login modal code goes here. 👇
    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (
            <section className="mainBodyLogin">
                <div className="registrationDivLeft">
                    <nav className="navbar">
                        <div className="logoimg">
                            <picture >
                                <img className="logo" src={require('../../images/ellalogofinal-02.png')} alt="ella logo" />
                            </picture>
                        </div>
                    </nav>
                    <div className="welcomeText">
                        <h1 className="welcomeText">tracking your health <br></br> shouldn't be a task.</h1>
                        <h1 className="welcomeSubText">ella was built for all womankind, celebrating <br></br> our lives by
simplifying our health journey.
</h1>
                    </div>
                    <form onSubmit={this.handleLogin}>
                        <fieldset>
                            <div className="loginForm">
                                <input
                                    onChange={this.handleFieldChange}
                                    type="email"
                                    id="email"
                                    required=""
                                    autoFocus=""
                                />
                                <br></br>
                                <label className="inputCopy" htmlFor="inputEmail">
                                    Email address
									</label>
                                <br></br>
                                <input
                                    onChange={this.handleFieldChange}
                                    type="password"
                                    id="password"
                                    required=""
                                /><br></br>
                                <label className="inputCopy" htmlFor="inputPassword">
                                    Password
									</label>
                            </div>
                        </fieldset>
                    </form>
                    <Button className="signIn" onClick={this.handleLogin}>
                        Sign In!
						</Button>{" "}

                    <Register triggerRender={this.props.triggerRender} />
                </div>
                <div className="brandImageRight">
                    <picture >
                        <img className="loginImage" src={require('../../images/ellalogin-01.png')} alt="ella logo" />
                    </picture>
                </div>
            </section>
        );
    }

}

export default Login

