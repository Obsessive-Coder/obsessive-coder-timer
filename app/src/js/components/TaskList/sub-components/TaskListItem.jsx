import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { removeTask, editTask } from "../../../actions";
import { EditButton } from "./";
import { Task } from "../../";

function mapDispatchToProps(dispatch) {
  return {
    removeTask: taskId => dispatch(removeTask({ taskId })),
    editTask: task => dispatch(editTask(task))
  };
}

class ConnectedTaskListItem extends Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
      taskDescription: ""
    };

    // Bind class methods.
    this.handleRemoveTaskClick = this.handleRemoveTaskClick.bind(this);
    this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
    this.handleEditTaskChange = this.handleEditTaskChange.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleToggleCompleteTask = this.handleToggleCompleteTask.bind(this);
  }

  handleRemoveTaskClick(event) {
    const taskId = event.target.getAttribute("data-task-id");
    this.props.removeTask(taskId);
  }

  handleEditTaskClick(event) {
    const { description: taskDescription } = this.props.task;
    this.setState(previousState => ({
      isEditing: !previousState.isEditing,
      taskDescription
    }));
  }

  handleEditTaskChange(event) {
    const taskDescription = event.target.value;
    this.setState(() => ({ taskDescription }));
  }

  handleUpdateTask() {
    const { taskDescription } = this.state;
    const { task } = this.props;

    // Only update the task if it has changed.
    if (task.description === taskDescription || taskDescription === "") {
      this.props.editTask({
        id: task.id,
        description: taskDescription,
        isComplete: task.isComplete
      });
    }

    this.setState(() => ({ isEditing: false }));
  }

  handleToggleCompleteTask() {
    const { task, editTask } = this.props;
    editTask({
      id: task.id,
      description: task.description,
      isComplete: !task.isComplete
    });
  }

  render() {
    const { isEditing, taskDescription } = this.state;
    const { task, className, children } = this.props;

    return (
      <li className={`list-group-item d-flex mb-1 p-0 shadow-sm ${className ? className : ""}`}>
        {children || (
          <Fragment>
            <Task
              task={task}
              taskDescription={taskDescription}
              isEditing={isEditing}
              handleEditTaskChange={this.handleEditTaskChange}
              handleToggleCompleteTask={this.handleToggleCompleteTask}
            />

            <EditButton
              taskId={task.id}
              handleClick={
                isEditing ? this.handleUpdateTask : this.handleEditTaskClick
              }
              buttonClass={isEditing ? "btn-success" : "btn-outline-info"}
              iconClass={`fas ${isEditing ? "fa-check" : "fa-pencil-alt"}`}
            />

            <EditButton
              taskId={task.id}
              handleClick={
                isEditing
                  ? this.handleEditTaskClick
                  : this.handleRemoveTaskClick
              }
              buttonClass={
                isEditing ? "btn-outline-warning" : "btn-outline-danger"
              }
              iconClass={`far ${
                isEditing ? "fa-window-close" : "fa-trash-alt"
              }`}
            />
          </Fragment>
        )}
      </li>
    );
  }
}

const TaskListItem = connect(
  null,
  mapDispatchToProps
)(ConnectedTaskListItem);

export default TaskListItem;
