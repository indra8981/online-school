import React,{ Component, useState,useEffect} from 'react';

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <h3>This is a School Management Site</h3>
        <button onClick={(e)=>{window.location="/register"}}>SignUp</button>
        <button>Login</button>
      </div>
    )
  }
}
