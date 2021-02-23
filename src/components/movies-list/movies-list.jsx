import React from 'react';
import {UsePropTypes} from '../../const.js';
import MovieItem from '../movie-item/movie-item.jsx';

const MoviesList = ({data, handleFilmClick, quantity}) => {

  return <div className="catalog__movies-list" >
    {data.map((film, id) => {
      let element = ``;
      if (id < quantity) {
        element = <MovieItem key={film.id} film={film} handleFilmClick={handleFilmClick}/>;
      }
      return element;
    })}
  </div>;
};

MoviesList.propTypes = {
  data: UsePropTypes.FILMS,
  handleFilmClick: UsePropTypes.HANDLE,
  quantity: UsePropTypes.QUANTITY
};

export default MoviesList;
