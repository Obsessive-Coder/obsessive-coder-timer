import { ACTION_TYPES } from '../constants';

const ACTIONS = {};

ACTION_TYPES.forEach((action) => {
  ACTIONS[action] = function(payload) {
    return {
      type: action,
      payload
    }
  }
});

export default ACTIONS;