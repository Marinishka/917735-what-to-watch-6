import React from 'react';
import {getAllGenres} from '../../utils/common';
import GenresItem from '../genres-item/genres-item';
import {PROP_TYPES_FILMS} from '../../const';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const GenresList = ({films, activeGenre, onGenreChange}) => {

  const genres = getAllGenres(films);

  const handleGenreChange = (evt) => {
    onGenreChange(evt.target.dataset.genre);
  };

  return <ul className="catalog__genres-list" onClick={handleGenreChange}>
    {genres.map((genre) => {
      return <GenresItem key={genre} genre={genre} activeGenre={activeGenre}/>;
    })}
  </ul>;
};

GenresList.propTypes = {
  films: PROP_TYPES_FILMS,
  activeGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre
}
);

const mapDispatchToProps = (dispatch) => ({
  onGenreChange(genre) {
    dispatch(ActionCreator.chengeGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
