import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player';
import {connect} from 'react-redux';
import {changeGenre, changeActiveFilm} from '../../store/action';
import {getAllGenres} from '../../store/data/selectors';
import {getActiveFilm} from '../../store/local-state/selectors';

const MovieItem = ({film, isPlaying, handleFilmMouseIn, onChangeGenre, onChangeActiveFilm}) => {
  const {previewVideoLink, name, id, previewImage, genre} = film;

  let timerId;
  const getSrcVideo = () => {
    return isPlaying ? previewVideoLink : ``;
  };

  return <article className="small-movie-card catalog__movies-card"
    onMouseOver={() => {
      clearTimeout(timerId);
      timerId = setTimeout(handleFilmMouseIn, 1000, id);
    }}
    onMouseLeave={() => {
      clearTimeout(timerId);
      handleFilmMouseIn(null);
    }}>
    <div className="small-movie-card__image">
      <VideoPlayer isMuted={true} isPlaying={isPlaying} src={getSrcVideo()} posterImage={previewImage} name={name}/>
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/films/${id}`}
        onClick={() => {
          clearTimeout(timerId);
          onChangeActiveFilm(film);
          onChangeGenre(genre);
        }}>
        {`${name}`}
      </Link>
    </h3>
  </article>;
};

MovieItem.propTypes = {
  film: PROP_TYPES_FILM,
  onChangeActiveFilm: PropTypes.func.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onChangeGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: getAllGenres(state),
  activeFilm: getActiveFilm(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre(genre) {
    dispatch(changeGenre(genre));
  },
  onChangeActiveFilm(activeFilm) {
    dispatch(changeActiveFilm(activeFilm));
  }
}
);

export {MovieItem};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
