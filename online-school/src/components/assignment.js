import React,{ Component, useState,useEffect} from 'react';
import {Cookies} from 'react-cookie';

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      assignment : ' '
    };
  }
  async componentDidMount(){
    let assignmentId = this.props.match.params.assignmentId;
    await fetch(`/assignment/${assignmentId}`).then(response => response.json()).then(Assignments => {
        console.log(Assignments);
        this.setState({assignment : Assignments.assignment});
    });
    console.log(this.state);
  }
  assignmentList(){
    return (<div>
        <h1>{this.state.assignment.assignmentTitle}</h1>
        <p>Maximum Marks : {this.state.assignment.maximumMarks}</p>
        <p>Deadline : {this.state.assignment.date}</p>
        <a href={`http://localhost:8080/${this.state.assignment.assignmentImage}` } target="_blank" > Download Assignment</a>
        </div>
    )
  }
  render() {
    return (
      <div>
        <h3>Welcome to our website</h3>
        <button onClick={()=>{
          const cookies = new Cookies();
          cookies.remove("token", {path: "/", domain: "localhost"});
          this.props.history.push("/");
        }}>Logout</button>

        <button onClick={(e)=>{
          this.props.history.push('/dashboard');
        }}>Dashboard</button>

        <div>
            {this.assignmentList()}
        </div>
      </div>
    )
  }
}
