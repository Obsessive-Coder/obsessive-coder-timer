import { ACTION_TYPES } from "../constants/action-types";

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
          intervalCount: state.timer.intervalCount,
          timerLength: action.payload.timerLength,
          shortBreakLength: action.payload.shortBreakLength,
          longBreakLength: action.payload.longBreakLength,
          phase: action.payload.phase
        }
      });

    case ACTION_TYPES.STOP_TIMER:
      const timer = initialState.timer;
      timer.intervalCount = state.timer.intervalCount;
      return Object.assign({}, state, { timer });

    case ACTION_TYPES.TOGGLE_TIMER_IS_COUNTING:
      return Object.assign({}, state, {
        timer: {
          timeLeft: state.timer.timeLeft,
          isCounting: !state.timer.isCounting,
          intervalCount: state.timer.intervalCount,
          timerLength: state.timer.timerLength,
          shortBreakLength: state.timer.shortBreakLength,
          longBreakLength: state.timer.longBreakLength,
          phase: state.timer.phase
        }
      });

    case ACTION_TYPES.COUNT_TIMER:
      let { timeLeft } = state.timer;
      timeLeft = timeLeft >= 1 ? timeLeft - 1 : 0;

      return Object.assign({}, state, {
        timer: {
          timeLeft,
          isCounting: true,
          intervalCount: state.timer.intervalCount,
          timerLength: state.timer.timerLength,
          shortBreakLength: state.timer.shortBreakLength,
          longBreakLength: state.timer.longBreakLength,
          phase: state.timer.phase
        }
      });

    case ACTION_TYPES.INCREMENT_INTERVAL_COUNT:
      let { intervalCount, phase } = state.timer;
      intervalCount = intervalCount < 4 ? intervalCount + 1 : 0;
      phase = phase === "pomodoro" ? "break" : "pomodoro";

      return Object.assign({}, state, {
        timer: {
          timeLeft: state.timer.timeLeft,
          isCounting: state.timer.isCounting,
          intervalCount: intervalCount,
          timerLength: state.timer.timerLength,
          shortBreakLength: state.timer.shortBreakLength,
          longBreakLength: state.timer.longBreakLength,
          phase: phase
        }
      });

    case ACTION_TYPES.RESET_TIMER:
      return Object.assign({}, state, {
        timer: {...DEFAULT_TIMER}
      });

    default:
      return state;
  }
}
