import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {getRatingText} from '../../utils/common';

const MovieOverview = ({film}) => {
  const {rating, scoresCount, description, director, starring} = film;
  return <><div className="movie-rating">
    <div className="movie-rating__score">{rating}</div>
    <p className="movie-rating__meta">
      <span className="movie-rating__level">{getRatingText(rating)}</span>
      <span className="movie-rating__count">{scoresCount} ratings</span>
    </p>
  </div>

  <div className="movie-card__text">
    <p>{description}</p>

    <p className="movie-card__director"><strong>Director: {director}</strong></p>

    <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
  </div></>;
};

MovieOverview.propTypes = {
  film: PROP_TYPES_FILM
};

export default MovieOverview;
