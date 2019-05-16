import { ADD_TASK, FOUND_ILLEGAL_CHARACTER } from '../constants/action-types';

const forbidderCharacters = ['<', '>', '(', ')'];

export function forbiddenCharacterMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if(action.type === ADD_TASK) {
        const foundCharacter = forbidderCharacters.filter((character) => (
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