import React, { Component, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { PageHeader, Button, Descriptions, Menu, Dropdown } from "antd";
import { Cookies } from "react-cookie";
import Cookies1 from "js-cookie";
import { DownOutlined } from "@ant-design/icons";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: " ",
    };
  }

  getDropDownMenu() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" href="/profile">
            Profile
          </a>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("token", { path: "/", domain: "localhost" });
            this.props.history.push("/");
          }}
        >
          <p>Logout</p>
        </Menu.Item>
      </Menu>
    );
    return menu;
  }

  async componentDidMount() {
    await fetch("/users/getbyemail")
      .then((response) => response.json())
      .then((user) => {
        this.setState({ name: user.name });
      });
  }

  getNav() {
    var fixedNav = [];
    console.log(this.state);
    if (this.props.isLoggedIn) {
      fixedNav = [
        <Button key="0" onClick={() => this.props.history.push("/dashboard")}>
          Dashboard
        </Button>,
        <Dropdown overlay={this.getDropDownMenu()}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {this.state.name} <DownOutlined />
          </a>
        </Dropdown>,
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
