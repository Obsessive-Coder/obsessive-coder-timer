import React from "react";

export default function TaskListItem(props) {
  const { className, children } = props;
  return (
    <li className={`list-group-item ${className ? className : ''}`}>
      {children}
    </li>
  );
}
