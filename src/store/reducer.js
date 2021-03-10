import {INITIAL_GENRE} from "../const";
import films from "../mocks/films";
import {ActionType} from "./action";

const initialState = {
  activeGenre: INITIAL_GENRE,
  films
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        activeGenre: action.payload
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload
      };
  }

  return state;
};

export {reducer};
