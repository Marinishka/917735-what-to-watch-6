import React from 'react';
import GenresItem from '../genres-item/genres-item';
import {changeGenre} from '../../store/action';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getActiveGenre} from '../../store/local-state/selectors';
import {getAllGenres} from '../../store/data/selectors';

const GenresList = ({activeGenre, onChangeGenre, allGenres}) => {

  const handleGenreChange = (evt) => {
    onChangeGenre(evt.target.dataset.genre);
  };

  return <ul className="catalog__genres-list" onClick={handleGenreChange}>
    {allGenres.slice(0, allGenres.length >= 10 ? 10 : allGenres.length).map((genre) => {
      return <GenresItem key={genre} genre={genre} activeGenre={activeGenre}/>;
    })}
  </ul>;
};

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  allGenres: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  allGenres: getAllGenres(state)
}
);

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre(genre) {
    dispatch(changeGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
