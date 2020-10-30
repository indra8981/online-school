import React, { Component, useState, useEffect } from "react";
import { Button } from "antd";
import LogInModal from "./login";
import SignUpModal from "./signup";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginvisible: false,
      signupvisible: false,
    };
  }
  showModalLogin = () => {
    this.setState({
      loginvisible: true,
    });
  };
  showModalSignUp = () => {
    this.setState({
      signupvisible: true,
    });
  };
  render() {
    return (
      <div>
        <h3>This is a School Management Site</h3>
        <Button type="primary" onClick={this.showModalLogin}>
          Login
        </Button>
        <Button type="primary" onClick={this.showModalSignUp}>
          SignUp
        </Button>
        <LogInModal
          visible={this.state.loginvisible}
          handleCancel={() => {
            this.setState({ loginvisible: false });
          }}
          {...this.props}
        />

        <SignUpModal
          visible={this.state.signupvisible}
          handleCancel={() => {
            this.setState({ signupvisible: false });
          }}
          {...this.props}
        />
      </div>
    );
  }
}
