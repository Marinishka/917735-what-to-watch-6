import React from 'react';
import {PROP_TYPES_FILMS} from '../../const.js';
import MovieItem from '../movie-item/movie-item.jsx';
import PropTypes from 'prop-types';

const MoviesList = ({data, handleFilmClick, quantity, handleFilmMouseIn, activePreviewFilmId}) => {
  const isFilmPreviewPlay = (filmId) => {
    return filmId === activePreviewFilmId;
  };

  return <div className="catalog__movies-list" >
    {data.slice(0, quantity).map((film) => {
      return <MovieItem key={film.id} film={film} handleFilmClick={handleFilmClick} handleFilmMouseIn={handleFilmMouseIn} isPlaying={isFilmPreviewPlay(film.id)}/>;
    })}
  </div>;
};

MoviesList.propTypes = {
  data: PROP_TYPES_FILMS,
  handleFilmClick: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  activePreviewFilmId: PropTypes.oneOfType([
    PropTypes.oneOf([`null`]), PropTypes.number
  ])
};

export default MoviesList;
