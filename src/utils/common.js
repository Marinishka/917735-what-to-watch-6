import {INITIAL_GENRE} from "../const";

export const getAllGenres = (films) => {
  const genres = new Set();
  films.forEach((film) => {
    genres.add(film.genre);
  });
  return [INITIAL_GENRE, ...genres];
};

export const getFilteredFilms = (genre, films) => {
  if (genre !== INITIAL_GENRE) {
    return films.filter((film) => film.genre === genre);
  }
  return films;
};
