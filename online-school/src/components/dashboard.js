import React,{ Component, useState,useEffect} from 'react';
import cookie from 'react-cookie';

export default class Dashboard extends Component {

  render() {
    return (
      <div>
        <h3>Welcome to our website</h3>
        <button onClick={()=>{
          console.log(cookie.load('token'));
          // const cookies = new Cookies();
          // cookies.remove("token",{path: "/", domain: "localhost"});
          // this.props.history.push("/");
        }}>Logout</button>
      </div>
    )
  }
}
