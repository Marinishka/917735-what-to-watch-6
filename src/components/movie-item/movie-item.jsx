import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const MovieItem = ({film, isPlaying, handleFilmMouseIn, changeGenre, changeActiveFilm}) => {
  const {previewVideoLink, name, id, previewImage, genre} = film;

  let timerId;
  const getSrcVideo = () => {
    return isPlaying ? previewVideoLink : ``;
  };

  return <article className="small-movie-card catalog__movies-card"
    onMouseOver={() => {
      timerId = setTimeout(handleFilmMouseIn, 1000, id);
    }}
    onMouseLeave={() => {
      clearInterval(timerId);
      handleFilmMouseIn(null);
    }}>
    <div className="small-movie-card__image">
      <VideoPlayer isMuted={true} isPlaying={isPlaying} src={getSrcVideo()} posterImage={previewImage} name={name}/>
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/films/${id}`}
        onClick={() => {
          changeActiveFilm(film);
          changeGenre(genre);
        }}>
        {`${name}`}
      </Link>
    </h3>
  </article>;
};

MovieItem.propTypes = {
  film: PROP_TYPES_FILM,
  changeActiveFilm: PropTypes.func.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  changeGenre: PropTypes.func.isRequired
};

const mapStateToProps = ({activeGenre, activeFilm}) => ({
  activeGenre,
  activeFilm
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.chengeGenre(genre));
  },
  changeActiveFilm(activeFilm) {
    dispatch(ActionCreator.changeActiveFilm(activeFilm));
  }
}
);

export {MovieItem};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
