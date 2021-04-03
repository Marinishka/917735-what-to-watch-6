import React, {useState} from 'react';
import {PROP_TYPES_FILMS} from '../../const.js';
import MovieItem from '../movie-item/movie-item.jsx';
import PropTypes from 'prop-types';

const MoviesList = ({films, quantity}) => {
  const [activePreviewFilmId, setActivePreviewFilmId] = useState(null);

  const handleFilmMouseIn = (id) => {
    setActivePreviewFilmId(id);
  };

  const isFilmPreviewPlay = (filmId) => {
    return filmId === activePreviewFilmId;
  };

  return <div className="catalog__movies-list" >
    {films.slice(0, quantity).map((film) => {
      return <MovieItem key={film.id} film={film} handleFilmMouseIn={handleFilmMouseIn} isPlaying={isFilmPreviewPlay(film.id)}/>;
    })}
  </div>;
};

MoviesList.propTypes = {
  films: PROP_TYPES_FILMS,
  quantity: PropTypes.number.isRequired
};

export default MoviesList;
