import React, { Component } from "react";
import { listAllPosts } from "../services/PostsService";
import Post from "./Post";

export default class PostsList extends Component {
  _isMounted = true;
  state = {
    posts: []
  };

  addNewPost = e => {
    e.preventDefault();
  };
  async componentDidMount() {
    const posts = await listAllPosts();
    this.setState({ posts });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h1>Welcome to homepage!</h1>
        <h2>Nice to have you :)</h2>
        <hr />
        <div align="center">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      </div>
    );
  }
}
