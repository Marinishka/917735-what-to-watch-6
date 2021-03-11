import {INITIAL_GENRE} from "../const";
import films from "../mocks/films";
import {getAllGenres} from "../utils/common";
import {ActionType} from "./action";

const initialState = {
  activeGenre: INITIAL_GENRE,
  films,
  allGenres: getAllGenres(films)
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
