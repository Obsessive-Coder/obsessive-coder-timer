import { ACTION_TYPES } from '../constants';

export function addTask(payload) {
  return {
    type: ACTION_TYPES.ADD_TASK,
    payload
  };
}

export function removeTask(payload) {
  return {
    type: ACTION_TYPES.REMOVE_TASK,
    payload
  };
}

export function editTask(payload) {
  return {
    type: ACTION_TYPES.EDIT_TASK,
    payload
  }
}

export function invalidCharacter(payload) {
  return {
    type: ACTION_TYPES.FOUND_ILLEGAL_CHARACTER,
    payload
  };
}

// Timer.
export function startTimer(payload){
  return {
    type: ACTION_TYPES.START_TIMER,
    payload
  }
}

export function stopTimer(payload) {
  return {
    type: ACTION_TYPES.STOP_TIMER,
    payload
  }
}

export function countTimer(payload) {
  return {
    type: ACTION_TYPES.COUNT_TIMER,
    payload
  }
}

export function incrementIntervalCount(payload) {
  return {
    type: ACTION_TYPES.INCREMENT_INTERVAL_COUNT,
    payload
  }
}

export function toggleTimerIsCounting(payload) {
  return {
    type: ACTION_TYPES.TOGGLE_TIMER_IS_COUNTING,
    payload
  }
}
