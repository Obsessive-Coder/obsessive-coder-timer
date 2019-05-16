import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  FOUND_ILLEGAL_CHARACTER
} from "../constants/action-types";

import { DEFAULT_TASKS } from "../constants/constants";

const initialState = {
  tasks: DEFAULT_TASKS
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat(action.payload)
      });
    case REMOVE_TASK:
      const { taskId } = action.payload;
      return Object.assign({}, state, {
        tasks: state.tasks.filter(task => task.id !== taskId)
      });
    case EDIT_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task = action.payload;
          }
          return task;
        })
      });
    case FOUND_ILLEGAL_CHARACTER:
      return Object.assign({}, state, {
        tasks: state.tasks,
        message: "An invalid character was entered."
      });
    default:
      return state;
  }
}
