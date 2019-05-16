import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TaskListHeading, TaskListItem, AddTaskForm } from "./sub-components";

class ConnectedTaskList extends Component {
  constructor() {
    super();

    this.state = {
      isAddingNewTask: false
    };

    // Bind class methods.
    this.toggleIsAddingNewTask = this.toggleIsAddingNewTask.bind(this);
  }

  toggleIsAddingNewTask() {
    if (this.props.tasks.length <= 0) return;
    this.setState(previousState => {
      const { isAddingNewTask } = previousState;
      return { isAddingNewTask: !isAddingNewTask };
    });
  }

  render() {
    const { isAddingNewTask } = this.state;
    const { tasks } = this.props;

    let taskListItems = tasks.map(task => (
      <TaskListItem
        key={task.id}
        task={task}
        className="p-1"
      />
    ));

    if (isAddingNewTask || !taskListItems.length) {
      taskListItems.unshift(
        <TaskListItem key={-1} className="p-0">
          <AddTaskForm toggleIsAddingNewTask={this.toggleIsAddingNewTask} />
        </TaskListItem>
      );
    }

    return (
      <Fragment>
        <TaskListHeading onToggleAddNewTaskClick={this.toggleIsAddingNewTask} />

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
