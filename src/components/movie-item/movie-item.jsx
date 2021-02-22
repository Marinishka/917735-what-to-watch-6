import React from 'react';
import {UsePropTypes} from '../../const';
import {Link} from 'react-router-dom';

const MovieItem = ({film, handleFilmClick}) => {
  const {previewImage, name, id} = film;
  return <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={`${previewImage}`} alt={`${name}`} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/films/${id}`}
        onClick={() => {
          handleFilmClick(film);
        }}>
        {`${name}`}
      </Link>
    </h3>
  </article>;
};

MovieItem.propTypes = {
  film: UsePropTypes.FILM,
  handleFilmClick: UsePropTypes.HANDLE
};

export default MovieItem;
