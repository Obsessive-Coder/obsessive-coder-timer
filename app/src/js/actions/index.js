import { ADD_TASK, FOUND_ILLEGAL_CHARACTER } from "../constants/action-types";

export function addTask(payload) {
  return {
    type: ADD_TASK,
    payload
  };
}

export function invalidCharacter(payload) {
  return {
    type: FOUND_ILLEGAL_CHARACTER,
    payload
  };
}
