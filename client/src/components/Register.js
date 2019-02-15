import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signupUser } from "../services/AuthService";

export default class Register extends Component {
  state = {
    redirect: false,
    error: null
  };

  onSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await signupUser(username, password);
      this.setState({ redirect: true });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  };

  render() {
    const { error, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          {error ? <p style={errorStyle}>ERROR: {this.state.error}</p> : ""}
          <input
            autoComplete="username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <input
            autoComplete="new-password"
            name="password"
            type="text"
            placeholder="Enter your password"
          />
          <button> REGISTER! </button>
        </form>
      </React.Fragment>
    );
  }
}

const errorStyle = {
  color: "red"
};
