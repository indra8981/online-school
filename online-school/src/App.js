import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/homepage.js";
import SignUp from "./components/signup.js";
import Dashboard from "./components/dashboard.js";
import LogIn from "./components/login.js";
import CreateClassRoom from "./components/create-classroom.js";
import CreateAssignment from "./components/create-assignment.js";
import withAuth from "./components/withAuth.js";
import Classroom from "./components/classroom";
import Assignment from "./components/assignment";
function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/dashboard" exact component={withAuth(Dashboard)} />
        <Route
          path="/classroom/:classRoomId"
          exact
          component={withAuth(Classroom)}
        />
        <Route
          path="/assignment/:assignmentId"
          exact
          component={withAuth(Assignment)}
        />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/create-classroom" component={withAuth(CreateClassRoom)} />
        <Route
          path="/create-assignment/:classRoomId/"
          component={withAuth(CreateAssignment)}
        />
      </div>
    </Router>
  );
}

export default App;
