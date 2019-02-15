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
              <Link className="nav-link" to="/posts">
                Posts
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
                <span>
                  Logout <i class="fas fa-sign-out-alt" />
                </span>
              </button>
            ) : (
              <React.Fragment>
                <Link
                  className="btn btn-success"
                  to="/register"
                  style={{ marginRight: "5px" }}
                >
                  <span>
                    Register <i class="fas fa-plus-square" />
                  </span>
                </Link>
                <Link className="btn btn-secondary" to="/login">
                  <span>
                    Login <i class="fas fa-sign-in-alt" />
                  </span>
                </Link>
              </React.Fragment>
            )}
          </form>
        </div>
      </nav>
    );
  }
}
