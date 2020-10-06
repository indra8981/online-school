import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./components/homepage.js"
import SignUp from "./components/signup.js";
import Dashboard from './components/dashboard.js';
import LogIn from './components/login.js';
import CreateClassRoom  from './components/create-classroom.js';
import Upload from './components/upload.js'
import withAuth from './components/withAuth.js';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/dashboard" exact component={withAuth(Dashboard)} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/create-classroom" component={withAuth(CreateClassRoom) } />
      </div>
    </Router>
  );
}

export default App;
