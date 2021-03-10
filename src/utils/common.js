import {INITIAL_GENRE} from "../const";

export const getAllGenres = (films) => {
  let genres = new Set();
  films.forEach((film) => {
    genres.add(film.genre);
  });
  return [INITIAL_GENRE, ...genres];
};

export const getFilteredFilms = (genre, films) => {
  let filteredFilms = [];
  if (genre !== INITIAL_GENRE) {
    filteredFilms = films.filter((film) => {
      return film.genre === genre;
    });
    return filteredFilms;
  }
  return films;
};
