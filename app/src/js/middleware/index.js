import { ADD_TASK, FOUND_ILLEGAL_CHARACTER } from '../constants/action-types';
import { FORBIDDEN_CHARACTERS } from '../constants/constants';

export function forbiddenCharacterMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if(action.type === ADD_TASK) {
        const foundCharacter = FORBIDDEN_CHARACTERS.filter((character) => (
          action.payload.description.includes(character)
        ));

        if(foundCharacter.length) {
          return dispatch({ type: FOUND_ILLEGAL_CHARACTER});
        }
      }
      return next(action);
    }
  }
}