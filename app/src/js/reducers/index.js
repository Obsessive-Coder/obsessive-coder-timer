import { ACTION_TYPES } from "../constants/action-types";
import { CONSTANTS } from "../constants";

const initialState = {
  tasks: CONSTANTS.DEFAULT_TASKS,
  timer: CONSTANTS.DEFAULT_POMODORO
};

export default function rootReducer(state = initialState, action) {
  const getNextTimerLength = () => {
    let timerLength = timer.pomodoroLength;

    if (timer.status === "work") {
      timerLength =
        timer.intervalCount && timer.intervalCount % 4 === 0
          ? timer.longBreakLength
          : timer.shortBreakLength;
    }

    return timerLength;
  };

  const getNextStatus = () => {
    return timer.status === "work" ? "break" : "work";
  };

  const getNextIntervalCount = () => {
    const { intervalCount, status } = timer;
    return status === "work" ? intervalCount + 1 : intervalCount;
  };

  const decrementTimeLeft = () => {
    let timeLeft = timer.timeLeft - 1;
    return timeLeft < 1 ? 0 : timeLeft;
  };

  let tasks = state.tasks.slice();
  let timer = Object.assign({}, state.timer);
  let statePropertyName;
  let statePropertyValue;

  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      statePropertyName = "tasks";
      statePropertyValue = tasks.concat(action.payload);
      break;

    case ACTION_TYPES.REMOVE_TASK:
      statePropertyName = "tasks";
      statePropertyValue = tasks.filter(
        task => task.id !== action.payload.taskId
      );
      break;

    case ACTION_TYPES.EDIT_TASK:
      statePropertyName = "tasks";
      statePropertyValue = tasks.map(task => {
        if (task.id === action.payload.id) {
          task = action.payload;
        }
        return task;
      });
      break;

    case ACTION_TYPES.FOUND_ILLEGAL_CHARACTER:
      statePropertyName = "tasks";
      statePropertyValue = tasks;
      break;

    case ACTION_TYPES.START_TIMER:
      timer.intervalCount = getNextIntervalCount();
      timer.timeLeft = getNextTimerLength();
      timer.status = getNextStatus();
      statePropertyName = "timer";
      statePropertyValue = timer;
      break;

    case ACTION_TYPES.COUNT_TIMER:
      timer.timeLeft = decrementTimeLeft();
      statePropertyName = "timer";
      statePropertyValue = timer;
      break;

    default:
      return state;
  }

  // Return the updated sate.
  const newState = Object.assign({}, state, {
    [statePropertyName]: statePropertyValue
  });

  return newState;
}
