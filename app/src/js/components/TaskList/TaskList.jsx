import React, { Fragment } from "react";
import { connect } from "react-redux";
import { TaskListItem, AddTaskForm } from "./sub-components";

function ConnectedTaskList(props) {
  const { tasks } = props;

  // Make an array of list items for each task.
  const taskListItems = tasks.map(task => (
    <TaskListItem key={task.id} task={task} />
  ));

  // Add the new task form as the first item in the array of list items.
  taskListItems.unshift(
    <TaskListItem key={-1} className="mb-1">
      <AddTaskForm />
    </TaskListItem>
  );

  return (
    <Fragment>
      <h2 className="text-center">Today's Tasks</h2>
      <ul className="list-group list-group-flush">{taskListItems}</ul>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return { tasks: state.tasks };
};

const TaskList = connect(mapStateToProps)(ConnectedTaskList);

export default TaskList;
