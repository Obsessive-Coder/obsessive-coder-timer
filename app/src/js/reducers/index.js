import { ADD_TASK, FOUND_ILLEGAL_CHARACTER } from "../constants/action-types";

const initialState = {
  tasks: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat(action.payload)
      });
    case FOUND_ILLEGAL_CHARACTER:
      return Object.assign({}, state, {
        tasks: state.tasks,
        message: 'An invalid character was entered.'
      });
    default:
      return state;
  }
}
