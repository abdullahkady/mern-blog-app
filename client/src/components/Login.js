import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authenticateUser } from "../services/AuthService";

export default class Login extends Component {
  state = {
    redirect: false,
    error: null,
    dismissError: false,
    dismissAlert: false
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ error: null, dismissError: false });
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await authenticateUser(username, password);
      if (this.props.updateAuthenticationState) {
        this.props.updateAuthenticationState();
      }
      this.setState({ redirect: true });
    } catch ({ message }) {
      if (!message) {
        message = "Something went wrong, please try again later.";
      }
      this.setState({ error: message });
    }
  };

  render() {
    const { dismissError, redirect, error } = this.state;
    let alert = undefined;
    if (
      !this.state.dismissAlert &&
      this.props.location &&
      this.props.location.state
    )
      alert = this.props.location.state.alert;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              alert: {
                header: "Welcome!",
                message: "You have been logged in successfully.",
                type: "success"
              }
            }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {alert && (
          <div className={`alert alert-dismissible alert-${alert.type}`}>
            <button
              type="button"
              className="close"
              onClick={e => this.setState({ dismissAlert: true })}
            >
              &times;
            </button>
            <strong>{alert.header}</strong>
            {" " + alert.message}
          </div>
        )}
        {!dismissError && error && (
          <div className="alert alert-dismissible alert-danger">
            <button
              type="button"
              className="close"
              onClick={e => this.setState({ dismissError: true })}
            >
              &times;
            </button>
            <strong>Oops!</strong>
            {" " + error}
          </div>
        )}
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Sign in</legend>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                autoComplete="current-password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}
