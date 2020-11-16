import React, { Component, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

export default class StudentClassRoom extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [],
      emailsList: " ",
      addEmailBoxToDOM: false,
    };
  }

  async componentDidMount() {
    let classRoomId = this.props.match.params.classRoomId;
    await fetch(`/assignment/getAllForStudent/${classRoomId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response;
      })
      .then((response) => response.json())
      .then((Assignments) => {
        this.setState({ assignments: Assignments.assignments });
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(this.state);
  }

  assignmentList() {
    const assignments = this.state.assignments.map((assignment) => {
      return (
        <div>
          <a href={`/assignment/${assignment._id}`}>
            {assignment.assignmentTitle}
          </a>
        </div>
      );
    });
    return assignments;
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
        <div>{this.assignmentList()}</div>
      </div>
    );
  }
}
