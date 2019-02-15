import React, { Component } from "react";
import { listAllPosts } from "../services/PostsService";
import { Link } from "react-router-dom";
import Post from "./Post";
import Spinner from "./Spinner";

export default class PostsList extends Component {
  _isMounted = true;
  state = {
    posts: [],
    isLoading: true
  };

  addNewPost = e => {
    e.preventDefault();
  };
  async componentDidMount() {
    const posts = await listAllPosts();
    if (this._isMounted) this.setState({ posts, isLoading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLoading, posts } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <div align="center">
        <h1>Posts List</h1>
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
