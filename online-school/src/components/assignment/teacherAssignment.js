import React, { Component, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export default class TeacherAssignment extends Component {
  constructor() {
    super();
    this.state = {
      assignment: " ",
      submission: [],
    };
  }
  async componentDidMount() {
    let assignmentId = this.props.match.params.assignmentId;
    console.log(assignmentId);
    await fetch(`/assignment/${assignmentId}`)
      .then((response) => response.json())
      .then((Assignments) => {
        console.log(Assignments);
        this.setState({ assignment: Assignments.assignment });
      });
    await fetch(`/assignment-submit/submission/${assignmentId}`)
      .then((response) => response.json())
      .then((submission) => {
        this.setState({ submission: submission.submission });
      });
  }
  assignmentList() {
    return (
      <div>
        <h1>{this.state.assignment.assignmentTitle}</h1>
        <p>Maximum Marks : {this.state.assignment.maximumMarks}</p>
        <p>Deadline : {this.state.assignment.date}</p>
        <a
          href={`http://localhost:8080/${this.state.assignment.assignmentImage}`}
          target="_blank"
        >
          {" "}
          Download Assignment
        </a>
      </div>
    );
  }
  submissionList() {
    const submissions = this.state.submission.map((submission) => {
      return (
        <div>
          <a
            href={`http://localhost:8080/${submission.assignmentImage}`}
            target="_blank"
          >
            {submission.studentEmail}
          </a>
        </div>
      );
    });
    return submissions;
  }
  render() {
    return (
      <div>
        <h3>Welcome to our website</h3>
        <button
          onClick={() => {
            const cookies = new Cookies();
            cookies.remove("token", { path: "/", domain: "localhost" });
            this.props.history.push("/");
          }}
        >
          Logout
        </button>

        <button
          onClick={(e) => {
            this.props.history.push("/dashboard");
          }}
        >
          Dashboard
        </button>

        <div>{this.assignmentList()}</div>
        <div>{this.submissionList()}</div>
      </div>
    );
  }
}
