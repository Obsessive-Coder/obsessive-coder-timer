import React from 'react';

export default function TaskListHeading(props) {
  const { onToggleAddNewTaskClick } = props;

  return (
    <div className="d-flex justify-content-center align-items-center">
      <h2 className="ml-auto">Today's Tasks</h2>
      <button
        onClick={onToggleAddNewTaskClick}
        className="btn btn-sm btn-success ml-auto rounded-circle"
      >
        <i className="fas fa-plus fa-sm" />
      </button>
    </div>
  );
}
