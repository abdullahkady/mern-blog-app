import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signupUser } from "../services/AuthService";

export default class Register extends Component {
  state = {
    redirect: false,
    error: null,
    dismissError: false
  };

  onSubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    this.setState({ dismissError: false });
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
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              alert: {
                header: "Welcome aboard!",
                message:
                  "Your account has been created successfully. Please login to start using the site :)",
                type: "success"
              }
            }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {!this.state.dismissError && error && (
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
            <legend>Register a new account</legend>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Enter username"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                autoComplete="new-password"
                aria-describedby="passwordHelp"
                placeholder="Password"
                minLength="6"
              />
              <small id="usernameHelp" className="form-text text-muted">
                6 or more characters are required.
              </small>
            </div>
            <button type="submit" className="btn btn-success">
              Signup
            </button>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}
