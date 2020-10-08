import React,{ Component, useState,useEffect} from 'react';
import {Cookies} from 'react-cookie';
import Cookies1 from 'js-cookie';

export default class Classroom extends Component {
  constructor() {
    super();
    this.state = {
      assignments : []
    };
  }
  async componentDidMount(){
    let classRoomId = this.props.match.params.classRoomId;
    await fetch(`/assignment/${classRoomId}`).then(response => response.json()).then(Assignments => {
      this.setState({assignments : Assignments.assignments });
    });
    console.log(this.state);
  }
  assignmentList(){
    const assignments = this.state.assignments.map((assignment)=>{
      return (<div>
      <a href={`/assignment/${assignment._id}`}>{assignment.assignmentTitle}</a>
      </div>)
    });
    return assignments;
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
          let classRoomId = this.props.match.params.classRoomId;
          this.props.history.push(`/create-assignment/${classRoomId}/`);
        }}>Create new assignment</button>

        <div>
          {this.assignmentList()}
        </div>
        
      </div>
    )
  }
}
