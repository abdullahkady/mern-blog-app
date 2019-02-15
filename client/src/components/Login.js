import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authenticateUser } from "../services/AuthService";

export default class Login extends Component {
  state = {
    redirect: false,
    error: false
  };

  onSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await authenticateUser(username, password);
      if (this.props.updateAuthenticationState) {
        this.props.updateAuthenticationState(true);
      }
      this.setState({ redirect: true });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  };

  render() {
    const { redirect, error } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <h2>Sign-in</h2>
        <form onSubmit={this.onSubmit}>
          {error ? <p style={errorStyle}>ERROR: {this.state.error}</p> : ""}
          <div>
            <label htmlFor="username">Username</label>
            <input
              autoComplete="username"
              name="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button> LOGIN </button>
        </form>
      </React.Fragment>
    );
  }
}

const errorStyle = {
  color: "red"
};
