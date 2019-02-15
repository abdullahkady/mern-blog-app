import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
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
            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={() => (
                <Login
                  updateAuthenticationState={this.updateAuthenticationState}
                />
              )}
            />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
