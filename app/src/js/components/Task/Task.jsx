import React, { Fragment } from "react";

export default function Task(props) {
  const { task, taskDescription, isEditing, handleEditTaskChange, handleToggleCompleteTask } = props;

  return (
    <Fragment>
      <button
        onClick={handleToggleCompleteTask}
        className="btn btn-sm btn-outline-success rounded-0"
      >
        <i
          className={`far fa-fw fa-lg ${
            task.isComplete ? "fa-check-square" : "fa-square"
          }`}
        />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={isEditing ? taskDescription : task.description}
          onChange={handleEditTaskChange}
          className="w-75 form-group form-group-sm m-0 px-2 border-right-0"
        />
      ) : (
        <label className="w-75 m-0 py-1 px-2">{task.description}</label>
      )}
    </Fragment>
  );
}
