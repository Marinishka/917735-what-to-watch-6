import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {getTimeInHourAndMinutes} from '../../utils/common';

const MovieDetails = ({film}) => {
  const {released, genre, director, starring, runTime} = film;

  return <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Director</strong>
        <span className="movie-card__details-value">{director}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Starring</strong>
        <span className="movie-card__details-value">
          {starring.map((actor) => {
            return (
              <span key={actor}>{actor}<br/></span>);
          })}
        </span>
      </p>
    </div>

    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Run Time</strong>
        <span className="movie-card__details-value">{getTimeInHourAndMinutes(runTime)}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Genre</strong>
        <span className="movie-card__details-value">{genre}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Released</strong>
        <span className="movie-card__details-value">{released}</span>
      </p>
    </div>
  </div>;
};

MovieDetails.propTypes = {
  film: PROP_TYPES_FILM
};

export default MovieDetails;
