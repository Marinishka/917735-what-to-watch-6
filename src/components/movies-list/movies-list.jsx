import React, {useState} from 'react';
import {PROP_TYPES_FILMS} from '../../const.js';
import MovieItem from '../movie-item/movie-item.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilteredFilms} from '../../utils/common.js';

const MoviesList = ({films, quantity, activeGenre}) => {
  const [activePreviewFilmId, setActivePreviewFilmId] = useState(null);

  const handleFilmMouseIn = (id) => {
    setActivePreviewFilmId(id);
  };

  const isFilmPreviewPlay = (filmId) => {
    return filmId === activePreviewFilmId;
  };

  const filteredFilms = getFilteredFilms(activeGenre, films);

  return <div className="catalog__movies-list" >
    {filteredFilms.slice(0, quantity).map((film) => {
      return <MovieItem key={film.id} film={film} handleFilmMouseIn={handleFilmMouseIn} isPlaying={isFilmPreviewPlay(film.id)}/>;
    })}
  </div>;
};

MoviesList.propTypes = {
  films: PROP_TYPES_FILMS,
  quantity: PropTypes.number.isRequired,
  activeGenre: PropTypes.string.isRequired
};

const mapStateToProps = ({activeGenre, films}) => ({
  activeGenre,
  films
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
