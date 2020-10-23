import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    // const [email,setemail]=useState("");
    // const [type,settype]=useState("");
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        email: "",
        type: null,
      };
    }

    componentDidMount() {
      fetch("/checkToken")
        .then(async (res) => {
          const resp = await res.json();
          if (res.status === 200) {
            this.setState({
              loading: false,
              email: resp.email,
              type: resp.type,
            });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <ComponentToProtect
          email={this.state.email}
          type={this.state.type}
          {...this.props}
        />
      );
    }
  };
}
