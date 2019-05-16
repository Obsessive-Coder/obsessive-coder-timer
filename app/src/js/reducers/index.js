// import {
//   ADD_TASK,
//   REMOVE_TASK,
//   EDIT_TASK,
//   FOUND_ILLEGAL_CHARACTER
// } from "../constants/action-types";

import { ACTION_TYPES } from "../constants";

import { DEFAULT_TASKS, DEFAULT_TIMER } from "../constants/constants";

const initialState = {
  tasks: DEFAULT_TASKS,
  timer: DEFAULT_TIMER
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat(action.payload)
      });
    case ACTION_TYPES.REMOVE_TASK:
      const { taskId } = action.payload;
      return Object.assign({}, state, {
        tasks: state.tasks.filter(task => task.id !== taskId)
      });
    case ACTION_TYPES.EDIT_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task = action.payload;
          }
          return task;
        })
      });
    case ACTION_TYPES.FOUND_ILLEGAL_CHARACTER:
      return Object.assign({}, state, {
        tasks: state.tasks,
        message: "An invalid character was entered."
      });
    case ACTION_TYPES.START_TIMER:
      return Object.assign({}, state, {
        timer: {
          timeLeft: action.payload.timeLeft,
          isCounting: true,
          intervalCount: state.timer.intervalCount
        }
      });
      case ACTION_TYPES.STOP_TIMER:
      return Object.assign({}, state, {
        timer: {
          timeLeft: 0,
          isCounting: false,
          intervalCount: state.timer.intervalCount
        }
      });
    case ACTION_TYPES.TOGGLE_TIMER_IS_COUNTING:
      return Object.assign({}, state, {
        timer: {
          timeLeft: state.timer.timeLeft,
          isCounting: !state.timer.isCounting,
          intervalCount: state.timer.intervalCount
        }
      });
    case ACTION_TYPES.COUNT_TIMER:
      let { timeLeft } = state.timer;
      timeLeft = timeLeft >= 1 ? (timeLeft - 1) : 0;

       return Object.assign({}, state,{
         timer: {
           timeLeft,
           isCounting: true,
           intervalCount: state.timer.intervalCount
         }
       });
    default:
      return state;
  }
}
