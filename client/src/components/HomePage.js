import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <div align="center">
        <h1>Welcome to React Blog!</h1>
        <hr />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-4">
            <p>You can check out all the users posts</p>
            <Link to="/posts" class="btn btn-outline-info">
              View posts
            </Link>
          </div>
          <div className="col-md-4">
            <p>Or you can create your own</p>
            <Link to="/create" class="btn btn-outline-success">
              Create a post
            </Link>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}
