import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTask } from "../../../actions";
import { FOUND_ILLEGAL_CHARACTER } from "../../../constants/action-types";

function mapDispatchToProps(dispatch) {
  return {
    addTask: task => dispatch(addTask(task))
  };
}

class ConnectAddTaskForm extends Component {
  constructor() {
    super();

    this.state = {
      taskDescription: "",
      message: ""
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

    if (description === "") return;

    const id = uuidv1();
    const addTaskResult = this.props.addTask({ description, id });
    let message;

    if (addTaskResult.type === FOUND_ILLEGAL_CHARACTER) {
      message = "An invalid character was entered. Please try again.";
    }

    this.setState(
      state => ({ taskDescription: "", message }),
      () => {
        if (message) alert(message);
      }
    );
  }

  render() {
    const { taskDescription } = this.state;

    return (
      <form onSubmit={this.handleNewTaskSubmit} className="form-inline">
        <div className="form-group flex-fill">
          <input
            type="text"
            id="taskDescription"
            placeholder="Task description"
            value={taskDescription}
            onChange={this.handleChangeTaskDescription}
            className="form-control form-control-sm w-100 rounded-0"
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-outline-success rounded-0"
        >
          <i className="fas fa-plus fa-sm" />
        </button>
      </form>
    );
  }
}

const AddTaskForm = connect(
  null,
  mapDispatchToProps
)(ConnectAddTaskForm);

export default AddTaskForm;
