import React, { Component, useState, useEffect } from "react";

import StudentClassRoom from "./classroom/studentClassRoom";
import TeacherClassRoom from "./classroom/teacherClassRoom";

export default class Classroom extends Component {
  constructor() {
    super();
  }
  render() {
    const { email, type } = this.props;
    return (
      <div>
        {type === 1 ? (
          <TeacherClassRoom {...this.props} />
        ) : (
          <StudentClassRoom {...this.props} />
        )}
      </div>
    );
  }
}
