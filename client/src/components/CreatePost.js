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
      <form onSubmit={this.submitPost}>
        <fieldset>
          <legend>Create a new post</legend>
          <div className="form-group">
            <textarea
              className="form-control"
              name="text"
              placeholder="Post content..."
              minLength="5"
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">
            Submit
          </button>
        </fieldset>
      </form>
    );
  }
}
