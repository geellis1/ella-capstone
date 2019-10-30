// Purpose of the File: Holds the registration data and returns the registration input fields.

import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIManager from '../modules/APIManager'
import "./auth.css";
import { withRouter, Link } from 'react-router-dom'


class Register extends Component {

  // Set initial state
  state = {
    firstName: "",
    lastName: "",
    email: "",
	password: "",
	profileImageId: "",
	profileImages: [],
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleFieldChange = (event) => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleRegister = (e) => {
    e.preventDefault()
    this.toggle()
    APIManager.getAll("users").then((users) => {
      let isMatch = users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())

      if (this.state.name === "") {
        window.alert("Please enter a name")
      } else if (this.state.email === "") {
        window.alert("Please enter an email address")
      } else if (this.state.password === "") {
        window.alert("Please enter a password")
      } else if (isMatch) {
        window.alert("Email address already exists")
      } else {
        let newUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
		  password: this.state.password,
		  profileImageId: this.state.profileImageId
        };
        APIManager.post("users", newUser)
            .then((createdUser) => {
            sessionStorage.setItem("userId", createdUser.id);
            sessionStorage.setItem("email", this.state.email);
            sessionStorage.setItem("firstName", this.state.firstName);
			sessionStorage.setItem("lastName", this.state.lastName);
            this.props.triggerRender();

              //This determines which page you land on upon registration
              this.props.history.push("/")
            }
        )}
      }
    )
}

componentDidMount() {
    //getAll from APIManager and hang on to that data; put it in state
    APIManager.getAll("profileImages").then(images => {
      this.setState({
        profileImages: images
      });
    });
  }

setImage (id) {
	this.setState({profileImageId:id})
}


  //Registration modal code goes here. 👇
  render() {

    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
    return (
		<div>
			<Link
				className="registrationLink"
				onClick={this.toggle}
			>
				Not a user? Create your account!
			</Link>
			<Modal
				isOpen={this.state.modal}
				toggle={this.toggle}
				className={this.props.className}
			>
				<ModalHeader toggle={this.toggle} close={closeBtn}>
					Create Your Account
				</ModalHeader>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									onChange={this.handleFieldChange}
									type="text"
									id="firstName"
									placeholder="First Name"
									required=""
									autoFocus=""
								/>
								<label htmlFor="firstName"> First Name</label>

                                <input
									onChange={this.handleFieldChange}
									type="text"
									id="lastName"
									placeholder="Last Name"
									required=""
									autoFocus=""
								/>
								<label htmlFor="lastName"> Last Name</label>

								<label htmlFor="inputEmail">
									Email address
								</label>
								<br></br>
								<input
									onChange={this.handleFieldChange}
									type="email"
									id="email"
									placeholder="Email address"
									required=""
									autoFocus=""
								/>

								<input
									onChange={this.handleFieldChange}
									type="password"
									id="password"
									placeholder="Password"
									required=""
								/>
								<label htmlFor="inputPassword">Password</label>
							</div>
						</fieldset>
					</form>
				{this.state.profileImages.map(img => (
					<img id="profileImageId" key={img.id} src={img.imgRoute} onClick={() => this.setImage(img.id)}/>
				))}
			</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.handleRegister}>
						Create Account!
					</Button>
					<Button color="secondary" onClick={this.toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
  }
}

export default withRouter(Register)