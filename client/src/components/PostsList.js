import React, { Component } from "react";
import { listAllPosts } from "../services/PostsService";
import { Link } from "react-router-dom";
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
    if (this._isMounted) this.setState({ posts });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { posts } = this.state;
    return (
      <div align="center">
        <h1>All posts :)</h1>
        <Link className="btn btn-success" to="/create">
          <span>
            Add your own <i className="fas fa-plus" />
          </span>
        </Link>
        <hr />
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    );
  }
}
