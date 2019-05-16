import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { AddTaskForm } from './';

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
    this.setState(previousState => {
      const { isAddingNewTask } = previousState;
      return { isAddingNewTask: !isAddingNewTask };
    });
  }

  render() {
    const { isAddingNewTask } = this.state;
    const { tasks } = this.props;
    console.log(isAddingNewTask);

    return (
      <Fragment>
        <div className="d-flex justify-content-center">
          <h2 className="ml-auto">Today's Tasks</h2>
          <button onClick={this.toggleIsAddingNewTask} className="btn btn-sm btn-success ml-auto">+</button>
        </div>
        <ul className="list-group list-group-flush">
          {isAddingNewTask || tasks.length <= 0 && (
            <li key="-1" className="list-group-item">
              <AddTaskForm toggleIsAddingNewTask={this.toggleIsAddingNewTask} />
            </li>
          )}

          {tasks.map(task => (
            <li key={task.id} className="list-group-item">
              {task.description}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasks };
};

const TaskList = connect(mapStateToProps)(ConnectedTaskList);

export default TaskList;
