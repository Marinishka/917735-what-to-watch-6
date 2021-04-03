import {getAllGenres} from "../../utils/common";
import {loadFilms, loadPreviewFilm} from "../action";
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  films: [],
  previewFilm: {},
  allGenres: [],
  isFilmsLoaded: false,
  isPreviewFilmLoaded: false
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(loadFilms, (state, action) => {
    state.isFilmsLoaded = true;
    state.films = action.payload;
    state.allGenres = getAllGenres(action.payload);
  });
  builder.addCase(loadPreviewFilm, (state, action) => {
    state.isPreviewFilmLoaded = true;
    state.previewFilm = action.payload;
  });
});

export {data};
