import {INITIAL_GENRE} from '../const';

export const ActionType = {
  CHANGE_GENRE: `genre/change`,
  LOAD_FILMS: `films/load`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `films/redirectToRoute`,
  CHANGE_ACTIVE_FILM: `film/change`
};

export const ActionCreator = {
  chengeGenre: (genre = INITIAL_GENRE) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  }),
  changeActiveFilm: (activeFilm) => ({
    type: ActionType.CHANGE_ACTIVE_FILM,
    payload: activeFilm
  })
};
