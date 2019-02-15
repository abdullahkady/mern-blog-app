import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    let alert = undefined;
    if (this.props.location && this.props.location.state)
      alert = this.props.location.state.alert;

    return (
      <div align="center">
        {alert && (
          <div className={`alert alert-dismissible alert-${alert.type}`}>
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>{alert.header}</strong>
            {" " + alert.message}
          </div>
        )}

        <h1>Welcome to React Blog!</h1>
        <hr />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-4">
            <p>You can check out all the users posts</p>
            <Link to="/posts" className="btn btn-outline-info">
              View posts
            </Link>
          </div>
          <div className="col-md-4">
            <p>Or you can create your own</p>
            <Link to="/create" className="btn btn-outline-success">
              Create a post
            </Link>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}
