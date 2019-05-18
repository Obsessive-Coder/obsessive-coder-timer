import { ACTION_TYPES } from '../constants/action-types';
import { FORBIDDEN_CHARACTERS } from '../constants/constants';

export function forbiddenCharacterMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if(action.type === ACTION_TYPES.ADD_TASK) {
        const foundCharacter = FORBIDDEN_CHARACTERS.filter((character) => (
          action.payload.description.includes(character)
        ));

        if(foundCharacter.length) {
          return dispatch({ type: ACTION_TYPES.FOUND_ILLEGAL_CHARACTER});
        }
      }
      return next(action);
    }
  }
}

export function getNextTimerLength() {
  return function(next) {
    return function(action) {

    }
  }
}