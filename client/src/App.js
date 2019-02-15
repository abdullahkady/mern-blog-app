import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostsList from "./components/PostsList";
import CreatePost from "./components/CreatePost";
import withAuth from "./hocs/withAuth";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import jwt_decode from "jwt-decode";

class App extends Component {
  getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { username } = jwt_decode(token);
    return username;
  };

  state = {
    username: this.getCurrentUser()
  };

  updateAuthenticationState = () => {
    this.setState({ username: this.getCurrentUser() });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.updateAuthenticationState();
  };

  render() {
    const { username } = this.state;
    return (
      <Router>
        <React.Fragment>
          <NavBar username={username} onLogout={this.logout} />
          <div style={{ marginTop: "30px" }} className="container jumbotron">
            <Route exact path="/" component={HomePage} />
            <Route path="/posts" component={withAuth(PostsList)} />
            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
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
