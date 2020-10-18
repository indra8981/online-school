import React, { Component} from "react";

import StudentDashboard from './dashboard/studentDashboard'
import TeacherDashboard from './dashboard/teacherDashboard'

export default class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    const {email,type} = this.props;
    return (
      <div>
      {type===1?<TeacherDashboard {...this.props} />:<StudentDashboard {...this.props} />}
      </div>
    );
  }
}
