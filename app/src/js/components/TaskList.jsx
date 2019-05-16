import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

const ConnectedTaskList = ({ tasks }) => (
  <ul className="list-group list-group-flush">
    {tasks.map((task) => (
      <li key={task.id} className="list-group-item">
        {task.description}
      </li>
    ))}
  </ul>
);

const TaskList = connect(mapStateToProps)(ConnectedTaskList);

export default TaskList;