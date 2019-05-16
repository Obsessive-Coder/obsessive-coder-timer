import React from 'react';
import TaskList from './TaskList.jsx';
import AddTaskForm from './AddTaskForm.jsx';

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
      <h2>Today's Tasks</h2>
      <TaskList />
    </div>
    <div className="col-md-4 offset-1">
      <h2>Add a new task</h2>
      <AddTaskForm />
    </div>
  </div>
);

export default App;