import React, { Component, useState, useEffect } from "react";
import LogInModal from "./login";
import { Button, } from "antd";
export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginvisible: false,
      signupvisible:false
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
        <Button type="primary" onClick={this.showModalSignUp}>
          Sign Up
        </Button>
        <button
          onClick={(e) => {
            window.location = "/register";
          }}
        >
          SignUp
        </button>
        <Button type="primary" onClick={this.showModalLogin}>
          Login
        </Button>
        <LogInModal
          visible={this.state.loginvisible}
          handleCancel={()=>{this.setState({loginvisible:false})}}
          {...this.props}
        />
      </div>
    );
  }
}
