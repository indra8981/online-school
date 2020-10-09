import React,{ Component, useState,useEffect} from 'react';
import {Cookies} from 'react-cookie';
import axios from 'axios';

export default class Classroom extends Component {
  constructor() {
    super();
    this.state = {
      assignments : [],
      emailsList : ' ', 
      addEmailBoxToDOM : false
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  myChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let classRoomId = this.props.match.params.classRoomId;
    console.log(this.state);
    axios.post(`/classrooms/addStudents/${classRoomId}`, this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  async componentDidMount(){
    let classRoomId = this.props.match.params.classRoomId;
    await fetch(`/assignment/getAll/${classRoomId}`).then(response => response.json()).then(Assignments => {
      this.setState({assignments : Assignments.assignments });
    });
    console.log(this.state);
  }
  assignmentList(){
    const assignments = this.state.assignments.map((assignment)=>{
      return (
      <div>
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

        <div>
          <button onClick={()=>{
            this.setState({addEmailBoxToDOM : true})
          }}>Add Student Emails</button>
          {this.state.addEmailBoxToDOM && (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type='text'
                  name='emailsList'
                  onChange={this.myChangeHandler}
                  style = {{width : "200px", height : "100px"}}
                />
                <p></p>
                <input type="submit" value="Submit" />
              </form>
            </div>
          )}
        </div>
        
      </div>
    )
  }
}
