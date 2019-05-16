import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTask } from "../actions";
import { FOUND_ILLEGAL_CHARACTER } from '../constants/action-types';

function mapDispatchToProps(dispatch) {
  return {
    addTask: task => dispatch(addTask(task))
  };
}

class ConnectAddTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      taskDescription: '',
      message: ''
    };

    this.handleChangeTaskDescription = this.handleChangeTaskDescription.bind(
      this
    );
    this.handleNewTaskSubmit = this.handleNewTaskSubmit.bind(this);
  }

  handleChangeTaskDescription(event) {
    const taskInput = event.target;
    this.setState(state => ({ [taskInput.id]: taskInput.value }));
  }

  handleNewTaskSubmit(event) {
    event.preventDefault();
    const { taskDescription: description } = this.state;

    if(description === '') return;

    const id = uuidv1();
    const addTaskResult = this.props.addTask({ description, id });
    let message;

    if(addTaskResult.type === FOUND_ILLEGAL_CHARACTER) {
      message = 'An invalid character was entered. Please try again.';
    }

    this.setState(state => ({taskDescription: '', message}), () => {
      if (message) {
        alert(message);
      }
    });
  }

  render() {
    const { taskDescription } = this.state;

    return(
      <form onSubmit={this.handleNewTaskSubmit}>
        <div className="form-group">
          <label htmlFor="task-description">
            Description
          </label>
          <input
            type="text"
            id="taskDescription"
            value={taskDescription}
            onChange={this.handleChangeTaskDescription}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Add
        </button>
      </form>
    );
  }
}

const TaskForm = connect(null, mapDispatchToProps)(ConnectAddTaskForm);

export default TaskForm;