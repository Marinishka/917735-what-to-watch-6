import {INITIAL_GENRE, RatingLevels, UNIT_OF_TIME} from '../const';

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
  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;
  delete adaptedFilm.is_favorite;
  delete adaptedFilm.run_time;
  delete adaptedFilm.scores_count;
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

export const getRatingText = (rating) => {
  const ratingLevel = RatingLevels.filter((level) => {
    return rating >= level.MIN_LEVEL || rating < level.MAX_LEVEL;
  });
  return ratingLevel.TEXT;
};

export const getTimeInHourAndMinutes = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / UNIT_OF_TIME);
  const minutes = timeInMinutes - (hours * UNIT_OF_TIME);
  return `${hours}h ${minutes}m`;
};
