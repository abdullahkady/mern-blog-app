import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    isAuthenticated: Boolean(localStorage.getItem("token"))
  };

  updateAuthenticationState = isAuthenticated => {
    this.setState({ isAuthenticated });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.updateAuthenticationState(false);
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <React.Fragment>
          <NavBar isAuthenticated={isAuthenticated} onLogout={this.logout} />
          <div className="container jumbotron">
            {/* ROUTER */}
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
