import React, { Component, useState, useEffect } from "react";
import StudentAssignment from "./assignment/studentAssignment";
import TeacherAssignment from "./assignment/teacherAssignment";

export default class Assignment extends Component {
  constructor() {
    super();
  }
  render() {
    const { email, type } = this.props;
    return (
      <div>
        {type === 1 ? (
          <TeacherAssignment {...this.props} />
        ) : (
          <StudentAssignment {...this.props} />
        )}
      </div>
    );
  }
}
