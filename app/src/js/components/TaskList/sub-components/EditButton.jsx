import React from "react";

export default function EditButton(props) {
  const {
    taskId,
    handleClick,
    buttonClass,
    iconClass
  } = props;
  return (
    <button
      data-task-id={taskId}
      onClick={handleClick}
      className={`btn btn-sm rounded-0 ${buttonClass}`}
    >
      <i className={`no-pointer-events fa-fw ${iconClass}`} />
    </button>
  );
}
