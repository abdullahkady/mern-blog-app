import React, { Component } from "react";

export default class Post extends Component {
  // props= {
  // author: {
  // username
  // },
  // text
  // }
  render() {
    const { author, text } = this.props.post;
    return (
      <li>
        <h5>{author.username}</h5>
        <p>{text}</p>
      </li>
    );
  }
}
