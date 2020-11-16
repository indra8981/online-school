import React, { Component } from "react";

import StudentDashboard from "./dashboard/studentDashboard";
import TeacherDashboard from "./dashboard/teacherDashboard";
import Navbar from "./navbar";

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    const { email, type } = this.props;
    return (
      <div>
        <Navbar isLoggedIn onBack={null} {...this.props} />
        {type === 1 ? (
          <TeacherDashboard {...this.props} />
        ) : (
          <StudentDashboard {...this.props} />
        )}
      </div>
    );
  }
}
