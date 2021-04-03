import {INITIAL_GENRE} from '../const';
import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_GENRE: `localState/changeGenre`,
  LOAD_FILMS: `data/loadFilms`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `localState/redirectToRoute`,
  CHANGE_ACTIVE_FILM: `localState/changeActiveFilm`,
  LOAD_PREVIEW_FILM: `data/loadPreviewFilm`,
  RESET_GENRE: `localState/resetGenre`,
  LOAD_ACTIVE_FILM: `localState/loadActiveFilm`
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre = INITIAL_GENRE) => {
  return {
    payload: genre
  };
});

export const loadFilms = createAction(ActionType.LOAD_FILMS, (films) => {
  return {
    payload: films
  };
});

export const loadPreviewFilm = createAction(ActionType.LOAD_PREVIEW_FILM, (film) => {
  return {
    payload: film
  };
});

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});

export const changeActiveFilm = createAction(ActionType.CHANGE_ACTIVE_FILM, (activeFilm) => {
  return {
    payload: activeFilm
  };
});

export const resetGenre = createAction(ActionType.RESET_GENRE, () => {
  return {
    payload: INITIAL_GENRE
  };
});
