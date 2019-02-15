import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { createPost } from "../services/PostsService";

export default class CreatePost extends Component {
  state = {
    redirect: false
  };
  submitPost = async event => {
    event.preventDefault();
    try {
      const created = await createPost(event.target.text.value);
      this.setState({ redirect: created });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <div>
        <h2>Create a new post!</h2>
        <form onSubmit={this.submitPost}>
          <label htmlFor="text">Post text</label>
          <input name="text" type="textarea" placeholder="Some text" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
