import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./components/homepage.js"
import SignUp from "./components/signup.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/register" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
