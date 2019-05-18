import { ACTION_TYPES } from "../constants/action-types";
import { CONSTANTS } from "../constants";

const initialState = {
  tasks: CONSTANTS.DEFAULT_TASKS,
  timer: CONSTANTS.DEFAULT_TIMER
};

export default function rootReducer(state = initialState, action) {
  function getNewStateObject(propertyName, propertyValue) {
    return Object.assign({}, state, {
      [propertyName]: propertyValue
    });
  }

  function getNewTimer(timer, newProperties = []) {
    const newTimer = Object.assign({}, timer);
    newProperties.forEach(property => {
      newTimer[property.key] = property.value;
    });
    return newTimer;
  }

  let tasks = state.tasks.slice();
  let timer = Object.assign({}, state.timer);
  let statePropertyName;
  let statePropertyValue;
  let newProperties = [];

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
      newProperties.push({ key: "isCounting", value: true });
      statePropertyName = "timer";
      timer = action.payload;
      break;

    case ACTION_TYPES.STOP_TIMER:
      statePropertyName = "timer";
      timer = initialState.timer;
      break;

    case ACTION_TYPES.TOGGLE_TIMER_IS_COUNTING:
      newProperties.push({ key: "isCounting", value: !timer.isCounting });
      statePropertyName = "timer";
      break;

    case ACTION_TYPES.COUNT_TIMER:
      let timeLeft = timer.timeLeft >= 1 ? timer.timeLeft - 1 : 0;
      newProperties.push({ key: "timeLeft", value: timeLeft });
      statePropertyName = "timer";
      break;

    case ACTION_TYPES.INCREMENT_INTERVAL_COUNT:
      const intervalCount =
        timer.intervalCount < 4 ? timer.intervalCount + 1 : 0;
      const phase = timer.phase === "pomodoro" ? "break" : "pomodoro";
      newProperties.push(
        { key: "intervalCount", value: intervalCount },
        { key: "phase", value: phase }
      );
      statePropertyName = "timer";
      break;

    case ACTION_TYPES.RESET_TIMER:
      statePropertyName = "timer";
      timer = CONSTANTS.DEFAULT_TIMER;
      break;

    default:
      return state;
  }

  if (statePropertyName === "timer") {
    statePropertyValue = getNewTimer(timer, newProperties);
  }

  return getNewStateObject(statePropertyName, statePropertyValue);
}
