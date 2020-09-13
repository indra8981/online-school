import React,{ Component, useState,useEffect} from 'react';
import {Cookies} from 'react-cookie';
import Cookies1 from 'js-cookie';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      classrooms : []
    };
  }
  async componentDidMount(){
    console.log("Hey");
    await fetch('/classrooms').then(response => response.json()).then(Classrooms => {
      console.log(Classrooms);
      this.setState({classrooms : Classrooms});
    });
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <h3>Welcome to our website</h3>
        <button onClick={()=>{
          const cookies = new Cookies();
          cookies.remove("token", {path: "/", domain: "localhost"});
          this.props.history.push("/");
        }}>Logout</button>
        
        <button onClick={(e)=>{
          console.log(Cookies1.get('token'));
          window.location="/create-classroom"
        }}>Create classroom</button>

        <div>
          {JSON.stringify(this.state.classrooms)}
        </div>
      </div>
    )
  }
}
