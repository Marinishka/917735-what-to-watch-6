import React from 'react';
import {PROP_TYPES_FILM} from '../../const';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player';
import {changeGenre, changeActiveFilm} from '../../store/action';
import {useDispatch} from 'react-redux';

const MovieItem = ({film, isPlaying, handleFilmMouseIn}) => {
  const {previewVideoLink, name, id, previewImage, genre} = film;

  const history = useHistory();

  const dispatch = useDispatch();

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
    <div className="small-movie-card__image" onClick={() => {
      clearTimeout(timerId);
      dispatch(changeActiveFilm(film));
      dispatch(changeGenre(genre));
      history.push(`/films/${id}`);
    }}>
      <VideoPlayer isMuted={true} isPlaying={isPlaying} src={getSrcVideo()} posterImage={previewImage} name={name}/>
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/films/${id}`}
        onClick={() => {
          clearTimeout(timerId);
          dispatch(changeActiveFilm(film));
          dispatch(changeGenre(genre));
        }}>
        {`${name}`}
      </Link>
    </h3>
  </article>;
};

MovieItem.propTypes = {
  film: PROP_TYPES_FILM,
  handleFilmMouseIn: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default MovieItem;
