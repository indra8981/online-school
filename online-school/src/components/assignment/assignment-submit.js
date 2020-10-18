import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class SubmitAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdt: new FormData(),
      submission: [],
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let assignmentId = this.props.match.params.assignmentId;
    await fetch(
      `/assignment-submit/submission/${assignmentId}?studentEmail=${this.props.email}`
    )
      .then((response) => response.json())
      .then((submission) => {
        this.setState({ submission: submission.submission });
      });
    console.log(this.state);
  }

  submissionList() {
    const submissions = this.state.submission.map((submission) => {
      return (
        <div>
          <a
            href={`http://localhost:8080/${submission.assignmentImage}`}
            target="_blank"
          >
            View Submission
          </a>
        </div>
      );
    });
    return submissions;
  }

  myChangeHandler(event) {
    const target = event.target;
    const value = target.files[0];
    const name = target.name;
    let prev = this.state.formdt;
    prev.append(`${name}`, value);
    this.setState({
      formdt: prev,
    });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    let assignmentId = this.props.match.params.assignmentId;
    console.log(assignmentId);
    let prev = this.state.formdt;
    prev.append("assignmentId", assignmentId);
    prev.append("email", this.props.email);
    console.log(prev);
    fetch(`http://localhost:8080/assignment-submit/`, {
      method: "POST",
      body: prev,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        {this.submissionList()}
        {this.state.submission.length == 0 && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Select a file</label>
                <input
                  type="file"
                  className="form-control"
                  name="assignmentImage"
                  onChange={this.myChangeHandler}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
      </div>
    );
  }
}
