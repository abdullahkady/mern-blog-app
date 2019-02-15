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
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Register a new account</legend>

            <div class="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter username"
              />
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                autoComplete="new-password"
                aria-describedby="passwordHelp"
                placeholder="Password"
                minlength="6"
              />
              <small id="usernameHelp" class="form-text text-muted">
                6 or more characters are required.
              </small>
            </div>
            <button type="submit" class="btn btn-success">
              Signup
            </button>
          </fieldset>
        </form>

        {error ? <p style={errorStyle}>ERROR: {this.state.error}</p> : ""}
      </React.Fragment>
    );
  }
}

const errorStyle = {
  color: "red"
};
