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
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
