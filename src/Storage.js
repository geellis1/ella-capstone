
// Purpose of the File: to hold functionality for sessionStorage for login, renders the <Navbar> and <ApplicationViews.js>

//<Dashboard.js> renders the <NavBar> and <ApplicationViews> in the place of <Nutshell.js>
import React, { Component } from 'react'
import ApplicationViews from './components/ApplicationViews'
import NavBar from './components/nav/NavBar'


class Storage extends Component {
    //On startup, there is no user (user: false)
    state = {
      user: sessionStorage.getItem("userId") !== null
    }

    // Check if userId are in session storage
    //returns true/false
    isAuthenticated = () => sessionStorage.getItem("userId") !== null

    setUser = (authObj) => {
      sessionStorage.setItem(
        "userId",
        JSON.stringify(authObj)
      )
    }
    triggerRender = () => {
      this.setState({
        user: this.isAuthenticated()
      });
    }

    clearUser = () => {
      sessionStorage.clear();
    }

    render() {
      return (
        <React.Fragment>
          <NavBar user={this.state.user} triggerRender={this.triggerRender} clearUser={this.clearUser} />
          <ApplicationViews user={this.state.user}
            setUser={this.setUser}
            triggerRender={this.triggerRender} />
        </React.Fragment>
      )
    }
  }


  export default Storage;