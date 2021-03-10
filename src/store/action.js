import {INITIAL_GENRE} from "../const";

export const ActionType = {
  CHANGE_GENRE: `genre/change`,
  LOAD_FILMS: `films/load`
};

export const ActionCreator = {
  chengeGenre: (genre = INITIAL_GENRE) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  })
};
