import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { listAllPosts } from "../services/PostsService";
import { Link } from "react-router-dom";
import Post from "./Post";
import Spinner from "./Spinner";

export default class PostsList extends Component {
  _isMounted = true;
  state = {
    posts: [],
    isLoading: true,
    redirect: false
  };

  addNewPost = e => {
    e.preventDefault();
  };
  async componentDidMount() {
    let posts = [];
    try {
      posts = await listAllPosts();
    } catch (error) {
      // TODO: Generic error handling should be refined
      this.setState({ redirect: true });
    }
    if (this._isMounted) this.setState({ posts, isLoading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLoading, posts, redirect } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              alert: {
                header: "Oops!",
                message: "Something went wrong.",
                type: "danger"
              }
            }
          }}
        />
      );
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
