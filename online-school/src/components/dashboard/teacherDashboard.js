import React, { Component, useState, useEffect } from "react";
import CreateClassRoom from "../create-classroom";
import { Button } from "antd";

export default class TeacherDashboard extends Component {
  constructor() {
    super();
    this.state = {
      classrooms: [],
      createClassroomVisible: false,
    };
  }
  async componentDidMount() {
    await fetch("/classrooms/teacher")
      .then((response) => response.json())
      .then((Classrooms) => {
        this.setState({ classrooms: Classrooms });
      });
  }
  classRoomList() {
    const classrooms = this.state.classrooms.map((classroom) => {
      return (
        <div>
          <a href={`/classroom/${classroom._id}`}>{classroom.subjectName}</a>
        </div>
      );
    });
    return classrooms;
  }
  showModalCreateClassroom = () => {
    this.setState({
      createClassroomVisible: true,
    });
  };
  render() {
    return (
      <div>
        <div
          style={{
            paddingLeft: "40%",
          }}
        >
          <Button type="primary" onClick={this.showModalCreateClassroom}>
            Create Classroom
          </Button>
        </div>

        <CreateClassRoom
          visible={this.state.createClassroomVisible}
          handleCancel={() => {
            this.setState({ createClassroomVisible: false });
          }}
          {...this.props}
        />
        <div>{this.classRoomList()}</div>
      </div>
    );
  }
}
