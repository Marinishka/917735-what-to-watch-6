import React from 'react';
import GenresItem from '../genres-item/genres-item';
import {changeGenre} from '../../store/action';
import {useSelector, useDispatch} from 'react-redux';

const GenresList = () => {
  const {activeGenre} = useSelector((state) => state.LOCAL);
  const {allGenres} = useSelector((state) => state.DATA);

  const dispatch = useDispatch();

  const handleGenreChange = (evt) => {
    dispatch(changeGenre(evt.target.dataset.genre));
  };

  return <ul className="catalog__genres-list" onClick={handleGenreChange}>
    {allGenres.slice(0, allGenres.length >= 10 ? 10 : allGenres.length).map((genre) => {
      return <GenresItem key={genre} genre={genre} activeGenre={activeGenre}/>;
    })}
  </ul>;
};

export default GenresList;
