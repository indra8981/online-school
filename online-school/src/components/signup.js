import React,{ Component, useState,useEffect} from 'react';

export default class SignUp extends Component {

  render() {
    return (
      <div>
        <h3>Please fill the details below</h3>
        <button onClick={(e)=>{window.location="/signup"}}>SignUp</button>
        <button>Login</button>
      </div>
    )
  }
}
