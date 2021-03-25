import {INITIAL_GENRE} from '../const';

export const ActionType = {
  CHANGE_GENRE: `localState/changeGenre`,
  LOAD_FILMS: `data/loadFilms`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `localState/redirectToRoute`,
  CHANGE_ACTIVE_FILM: `localState/changeActiveFilm`,
  LOAD_PREVIEW_FILM: `data/loadPreviewFilm`
};

export const changeGenre = (genre = INITIAL_GENRE) => ({
  type: ActionType.CHANGE_GENRE,
  payload: genre
});

export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films
});

export const loadPreviewFilm = (film) => ({
  type: ActionType.LOAD_PREVIEW_FILM,
  payload: film
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url
});

export const changeActiveFilm = (activeFilm) => ({
  type: ActionType.CHANGE_ACTIVE_FILM,
  payload: activeFilm
});
