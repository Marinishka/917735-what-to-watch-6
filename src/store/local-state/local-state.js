import {INITIAL_GENRE} from '../../const';
import {ActionType} from '../action';

const initialState = {
  activeGenre: INITIAL_GENRE,
  activeFilm: {}
};

const localState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        activeGenre: action.payload
      };
    case ActionType.CHANGE_ACTIVE_FILM:
      return {
        ...state,
        activeFilm: action.payload
      };
  }

  return state;
};

export {localState};
