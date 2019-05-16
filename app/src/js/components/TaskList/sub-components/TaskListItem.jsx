import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTask, editTask } from "../../../actions";

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
    const { id } = this.props.task;
    this.props.editTask({id, description: this.state.taskDescription});
    this.setState(() => ({isEditing: false}));
  }

  render() {
    const { isEditing, taskDescription } = this.state;
    const { task, children } = this.props;

    return (
      <li className="list-group-item p-0">
        {children || (
          <div className="d-flex">
            {isEditing ? (
              <input
                type="text"
                value={isEditing ? taskDescription : task.description}
                onChange={this.handleEditTaskChange}
                className="flex-fill form-group form-group-sm m-0 px-2"
              />
            ) : (
              <label className="flex-fill mb-0 py-1 px-2">
                {task.description}
              </label>
            )}

            <button
              data-task-id={task.id}
              onClick={isEditing ? this.handleUpdateTask : this.handleEditTaskClick}
              className={`btn btn-sm rounded-0 ${isEditing ? 'btn-success' : 'btn-outline-info'}`}
            >
              <i className={`no-pointer-events fas ${isEditing ? 'fa-check' : 'fa-pencil-alt'}`} />
            </button>

            <button
              data-task-id={task.id}
              onClick={isEditing ? this.handleEditTaskClick : this.handleRemoveTaskClick}
              className={`btn btn-sm rounded-0 ${isEditing ? 'btn-outline-warning' : 'btn-outline-danger'}`}
            >
              <i className={`no-pointer-events far ${isEditing ? 'fa-window-close' : 'fa-trash-alt'}`} />
            </button>
          </div>
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
