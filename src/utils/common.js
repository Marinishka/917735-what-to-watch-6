import {INITIAL_GENRE, RatingLevels} from '../const';

export const adaptFilmToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterImage: film.poster_image,
        previewImage: film.preview_image,
        backgroundImage: film.background_image,
        backgroundColor: film.background_color,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link,
        isFavorite: film.is_favorite,
        runTime: film.run_time,
        scoresCount: film.scores_count
      }
  );
  delete film.poster_image;
  delete film.preview_image;
  delete film.background_image;
  delete film.background_color;
  delete film.video_link;
  delete film.preview_video_link;
  delete film.is_favorite;
  delete film.run_time;
  delete film.scores_count;
  return adaptedFilm;
};

export const adaptFilmsToClient = (films) => {
  return films.map((film) => {
    return adaptFilmToClient(film);
  });
};

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

export const getRaitingText = (rating) => {
  const raitingLevel = RatingLevels.filter((level) => {
    return rating >= level.MIN_LEVEL || rating < level.MAX_LEVEL;
  });
  return raitingLevel.TEXT;
};
