import React from 'react';
import GenresItem from '../genres-item/genres-item';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const GenresList = ({activeGenre, changeGenre, allGenres}) => {

  const handleGenreChange = (evt) => {
    changeGenre(evt.target.dataset.genre);
  };

  return <ul className="catalog__genres-list" onClick={handleGenreChange}>
    {allGenres.slice(0, allGenres.length >= 10 ? 10 : allGenres.length).map((genre) => {
      return <GenresItem key={genre} genre={genre} activeGenre={activeGenre}/>;
    })}
  </ul>;
};

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  allGenres: PropTypes.array.isRequired
};

const mapStateToProps = ({activeGenre, allGenres}) => ({
  activeGenre,
  allGenres
}
);

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.chengeGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
