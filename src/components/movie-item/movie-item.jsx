import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

const MovieItem = ({film, handleFilmClick, isPlaying, handleFilmMouseIn, changeGenre}) => {
  const {previewVideoLink, name, id, previewImage, genre} = film;

  const handleGenreChange = () => {
    changeGenre(genre);
  };

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
        onClick={(evt) => {
          handleFilmClick(film);
          handleGenreChange(evt);
        }}>
        {`${name}`}
      </Link>
    </h3>
  </article>;
};

MovieItem.propTypes = {
  film: PROP_TYPES_FILM,
  handleFilmClick: PropTypes.func.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  changeGenre: PropTypes.func.isRequired
};

const mapStateToProps = ({activeGenre}) => ({
  activeGenre
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.chengeGenre(genre));
  }
}
);

export {MovieItem};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
