import React, { Component, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { PageHeader, Button, Descriptions } from "antd";
import { Cookies } from "react-cookie";
import Cookies1 from "js-cookie";

export default class Navbar extends Component {
  getNav() {
    var fixedNav = [];
    if (this.props.isLoggedIn) {
      fixedNav = [
        <Button
          key="1"
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("token", { path: "/", domain: "localhost" });
            this.props.history.push("/");
          }}
        >
          Logout
        </Button>,
        <Button key="0" onClick={() => this.props.history.push("/dashboard")}>
          Dashboard
        </Button>,
      ];
    } else {
      fixedNav = [
        <Button key="2" onClick={() => this.props.history.push("/")}>
          Home
        </Button>,
        <Button key="3" onClick={() => this.props.history.push("/")}>
          Login
        </Button>,
        <Button key="4" onClick={() => this.props.history.push("/")}>
          Signup
        </Button>,
      ];
    }
    if (this.props.extra) {
      fixedNav.concat(this.props.extra);
    }
    return fixedNav;
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={this.props.onBack}
          title={this.props.title}
          subTitle={this.props.subTitle}
          extra={this.getNav()}
        />
      </div>
    );
  }
}

Navbar.defaultProps = {
  onBack: () => {},
  title: "Online school",
  subTitle: "Dashboard",
  extra: [],
  isLoggedIn: false,
};
