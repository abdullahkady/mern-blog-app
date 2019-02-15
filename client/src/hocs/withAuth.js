import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: false
      };
    }

    componentDidMount() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setState({ redirect: true });
      }
    }
    render() {
      const { redirect } = this.state;
      if (redirect) {
        return (
          <Redirect
            to={{
              pathname: "/login/",
              state: {
                alert: {
                  header: "Sorry :(",
                  message: `Your have to login first to be able to access the page.`,
                  type: "warning"
                }
              }
            }}
          />
        );
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
