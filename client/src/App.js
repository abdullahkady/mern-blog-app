import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import withAuth from "./hocs/withAuth";
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
            <Route exact path="/" component={withAuth(HomePage)} />
            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={() => (
                <Login
                  updateAuthenticationState={this.updateAuthenticationState}
                />
              )}
            />
            <Route path="/create" component={withAuth(CreatePost)} />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
