import React from 'react';
import {PROP_TYPES_FILMS} from '../../const.js';
import MovieItem from '../movie-item/movie-item.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilteredFilms} from '../../utils/common.js';

const MoviesList = ({films, handleFilmClick, quantity, handleFilmMouseIn, activePreviewFilmId, activeGenre}) => {
  const isFilmPreviewPlay = (filmId) => {
    return filmId === activePreviewFilmId;
  };

  const filteredFilms = getFilteredFilms(activeGenre, films);

  return <div className="catalog__movies-list" >
    {filteredFilms.slice(0, quantity).map((film) => {
      return <MovieItem key={film.id} film={film} handleFilmClick={handleFilmClick} handleFilmMouseIn={handleFilmMouseIn} isPlaying={isFilmPreviewPlay(film.id)}/>;
    })}
  </div>;
};

MoviesList.propTypes = {
  films: PROP_TYPES_FILMS,
  handleFilmClick: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  activePreviewFilmId: PropTypes.oneOfType([
    PropTypes.oneOf([`null`]), PropTypes.number
  ])
};

const mapStateToProps = ({activeGenre, films}) => ({
  activeGenre,
  films
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
