import React from 'react';
import GenresItem from '../genres-item/genres-item';
import {changeGenre} from '../../store/action';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

const GenresList = ({onGenreChange}) => {
  const activeGenre = useSelector((state) => state.LOCAL.activeGenre);
  const allGenres = useSelector((state) => state.DATA.allGenres);

  const dispatch = useDispatch();

  const handleGenreChange = (evt) => {
    dispatch(changeGenre(evt.target.dataset.genre));
    onGenreChange();
  };

  return <ul className="catalog__genres-list" onClick={handleGenreChange}>
    {allGenres.slice(0, allGenres.length >= 10 ? 10 : allGenres.length).map((genre) => {
      return <GenresItem key={genre} genre={genre} activeGenre={activeGenre}/>;
    })}
  </ul>;
};

GenresList.propTypes = {
  onGenreChange: PropTypes.func.isRequired
};

export default GenresList;
