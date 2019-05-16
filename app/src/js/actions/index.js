import { ADD_TASK, REMOVE_TASK, FOUND_ILLEGAL_CHARACTER, EDIT_TASK } from "../constants/action-types";

export function addTask(payload) {
  return {
    type: ADD_TASK,
    payload
  };
}

export function removeTask(payload) {
  return {
    type: REMOVE_TASK,
    payload
  };
}

export function editTask(payload) {
  return {
    type: EDIT_TASK,
    payload
  }
}

export function invalidCharacter(payload) {
  return {
    type: FOUND_ILLEGAL_CHARACTER,
    payload
  };
}
