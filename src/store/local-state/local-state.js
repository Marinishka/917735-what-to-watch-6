import {INITIAL_GENRE} from '../../const';
import {catchError, changeActiveFilm, changeGenre, resetGenre} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  activeGenre: INITIAL_GENRE,
  activeFilm: {},
  error: null
};

const localState = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.activeGenre = action.payload;
  });
  builder.addCase(changeActiveFilm, (state, action) => {
    state.activeFilm = action.payload;
  });
  builder.addCase(resetGenre, (state, action) => {
    state.activeGenre = action.payload;
  });
  builder.addCase(catchError, (state, action) => {
    state.error = action.payload;
  });
});

export {localState};
