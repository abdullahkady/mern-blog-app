import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          React Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create post
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {isAuthenticated ? (
              <button
                className="btn btn-danger my-2 my-sm-0"
                onClick={this.props.onLogout}
              >
                Logout
              </button>
            ) : (
              <React.Fragment>
                <Link className="btn btn-secondary my-2 my-sm-0" to="/login">
                  Login
                </Link>
                <Link className="btn btn-success my-2 my-sm-0" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
          </form>
        </div>
      </nav>
    );
  }
}
