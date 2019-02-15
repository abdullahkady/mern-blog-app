import React, { Component } from "react";

export default class Post extends Component {
  render() {
    const { author, text } =   this.props.post;
    return (
      <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
        <div className="card-header" style={{ textAlign: "left" }}>
          <span>
            <i className="fas fa-user" /> {author.username}
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  }
}
