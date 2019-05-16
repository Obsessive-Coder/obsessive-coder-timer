import React from "react";
import { connect } from "react-redux";
import { removeTask } from '../../../actions';

function mapDispatchToProps(dispatch) {
  return {
    removeTask: taskId => dispatch(removeTask({ taskId }))
  };
}

function ConnectedTaskListItem(props) {
  const { task, className, children } = props;

  const onRemoveTaskClick = (event) => {
    const taskId = event.target.getAttribute('data-task-id');
    props.removeTask(taskId);
  }

  return (
    <li className={`list-group-item ${className ? className : ""}`}>
      {children || (
        <div className="d-flex">
          <label className="flex-fill mb-0">{task.description}</label>
          <button
            data-task-id={task.id}
            onClick={onRemoveTaskClick}
            className="btn btn-outline-danger btn-sm rounded-0"
          >
            <i className="far fa-trash-alt no-pointer-events" />
          </button>
        </div>
      )}
    </li>
  );
}

const TaskListItem = connect(null, mapDispatchToProps)(ConnectedTaskListItem);

export default TaskListItem;
