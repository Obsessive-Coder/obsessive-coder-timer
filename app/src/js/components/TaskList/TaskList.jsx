import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TaskListItem, AddTaskForm } from "./sub-components";

class ConnectedTaskList extends Component {
  render() {
    const tasks = this.props.tasks.filter(task => !task.isComplete);


    const taskListItems = tasks.map(task => (
      <TaskListItem key={task.id} task={task} />
    ));

    taskListItems.unshift(
      <TaskListItem key={-1} className="mb-1">
        <AddTaskForm toggleIsAddingNewTask={this.toggleIsAddingNewTask} />
      </TaskListItem>
    );

    return (
      <Fragment>
        <h2 className="text-center">Today's Tasks</h2>
        <ul className="list-group list-group-flush">{taskListItems}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasks };
};

const TaskList = connect(mapStateToProps)(ConnectedTaskList);

export default TaskList;
