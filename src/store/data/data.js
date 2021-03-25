import {getAllGenres} from "../../utils/common";
import {ActionType} from "../action";

const initialState = {
  films: [],
  previewFilm: {},
  allGenres: [],
  isFilmsLoaded: false,
  isPreviewFilmLoaded: false
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isFilmsLoaded: true,
        allGenres: getAllGenres(action.payload)
      };
    case ActionType.LOAD_PREVIEW_FILM:
      return {
        ...state,
        previewFilm: action.payload,
        isPreviewFilmLoaded: true
      };
  }

  return state;
};

export {data};
