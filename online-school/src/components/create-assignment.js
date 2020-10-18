import React, { Component, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      formdt: new FormData(),
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.myChangeHandler1 = this.myChangeHandler1.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  myChangeHandler1(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let prev = this.state.formdt;
    prev.append(`${name}`, value);
    this.setState({
      formdt: prev,
    });
    console.log(this.state);
  }

  onChangeDate(date) {
    console.log(date);
    this.setState({
      date: date,
    });
  }

  handleSubmit() {
    let classRoomId = this.props.match.params.classRoomId;
    let prev = this.state.formdt;
    prev.append("date", this.state.date);
    prev.append("classRoomId", classRoomId);
    console.log(prev);
    fetch("http://localhost:8080/assignment/", {
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Assignment Title</label>
            <input
              type="text"
              required
              className="form-control"
              name="assignmentTitle"
              onChange={this.myChangeHandler1}
            />
          </div>
          <div className="form-group">
            <label>Maximum Marks </label>
            <input
              type="text"
              className="form-control"
              name="maximumMarks"
              onChange={this.myChangeHandler1}
            />
          </div>
          <div className="form-group">
            <label>Select a file</label>
            <input
              type="file"
              className="form-control"
              name="assignmentImage"
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
