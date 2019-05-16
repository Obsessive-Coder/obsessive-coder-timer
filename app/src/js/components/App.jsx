import React from "react";
import { TaskList, Timer } from "../components";
import "../../index.css";

const App = () => (
  <div className="container-fluid">
    <div className="row mt-5">
      <div className="col-4">
        <TaskList />
      </div>
      <div className="col-8">
        <Timer />
      </div>
    </div>
  </div>
);

export default App;
