import React from 'react';
import {AuthorizationStatus, Routes} from '../../const';
import {useHistory} from 'react-router-dom';
import {changeActiveFilm} from '../../store/action';
import {postFavoriteStatus} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';
import UserElement from '../user-element/user-element';

const PreviewFilmCard = () => {
  const previewFilm = useSelector((state) => state.DATA.previewFilm);
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);
  const {backgroundImage, name, posterImage, genre, released, isFavorite, id} = previewFilm;

  const dispatch = useDispatch();

  const history = useHistory();

  return <section className="movie-card">
    <div className="movie-card__bg">
      <img src={backgroundImage} alt={name} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        <UserElement/>
      </div>
    </header>

    <div className="movie-card__wrap">
      <div className="movie-card__info">
        <div className="movie-card__poster">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <h2 className="movie-card__title">{name}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{genre}</span>
            <span className="movie-card__year">{released}</span>
          </p>

          <div className="movie-card__buttons">
            <button className="btn btn--play movie-card__button" type="button" onClick={() => {
              dispatch(changeActiveFilm(previewFilm));
              history.push(`/player/${id}`);
            }}><svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s">
              </use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list movie-card__button" type="button" onClick={() => {
              if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                history.push(Routes.SIGN_IN);
              } else {
                const status = Number(!isFavorite);
                dispatch(postFavoriteStatus({id, status}));
              }
            }}>
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span>My list</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>;
};

export default PreviewFilmCard;
