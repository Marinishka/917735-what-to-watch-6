import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {PROP_TYPES_FILMS, QuantityFilmsOnPage, Routes, PROP_TYPES_PREVIEW_FILM, AuthorizationStatus} from '../../const';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list';
import GenresList from '../genres-list/genres-list';
import {connect} from 'react-redux';
import Loading from '../loading/loading';
import {fetchFilmList, fetchPreviewFilm, postFavoriteStatus} from '../../store/api-actions';
import {getFilteredFilms} from '../../utils/common.js';
import {changeActiveFilm} from '../../store/action';
import {getFilms, getLoadedFilmsStatus, getLoadedPreviewFolmStatus, getPreviewFilm} from '../../store/data/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getActiveGenre} from '../../store/local-state/selectors';

const Main = ({films, isPreviewFilmLoaded, isFilmsLoaded, onLoadPreviewFilm, onLoadFilmList, previewFilm, authorizationStatus, onButtonClick, activeGenre, onChangeActiveFilm, onChangeFavoriteStatus}) => {
  const {posterImage, backgroundImage, name, genre, released, id, isFavorite} = previewFilm;
  const [quantityFilms, setQuantityFilms] = useState(QuantityFilmsOnPage.MAIN);

  const isDataLoaded = isFilmsLoaded && isPreviewFilmLoaded;

  useEffect(() => {
    if (!isFilmsLoaded) {
      onLoadFilmList();
    }
  }, [isFilmsLoaded]);

  useEffect(() => {
    if (!isPreviewFilmLoaded) {
      onLoadPreviewFilm();
    }
  }, [isPreviewFilmLoaded]);

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  const filteredFilms = getFilteredFilms(activeGenre, films);

  const getButtonShowMore = () => {
    return quantityFilms <= filteredFilms.length
      ? <div className="catalog__more">
        <button className="catalog__button" type="button"onClick={() => setQuantityFilms((prevQuantityFilms) => prevQuantityFilms + QuantityFilmsOnPage.MAIN)} >Show more</button>
      </div> : ``;
  };

  const getUserElement = (status) => {
    return status === AuthorizationStatus.AUTH
      ? <div className="user-block__avatar">
        <Link to={Routes.MY_LIST}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
      </div>
      : <Link to={Routes.SIGN_IN} className="user-block__link">Sign in</Link>;
  };

  return <>
    <section className="movie-card">
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
          {getUserElement(authorizationStatus)}
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
                onChangeActiveFilm(previewFilm);
                onButtonClick(`/player/${id}`);
              }}><svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s">
                </use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                  onButtonClick(Routes.SIGN_IN);
                } else {
                  const status = Number(isFavorite);
                  onChangeFavoriteStatus({id, status});
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
    </section>
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresList/>

        <MoviesList films={filteredFilms} quantity={quantityFilms}/>

        {getButtonShowMore()}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>;
};

Main.propTypes = {
  films: PROP_TYPES_FILMS,
  isPreviewFilmLoaded: PropTypes.bool.isRequired,
  isFilmsLoaded: PropTypes.bool.isRequired,
  onLoadFilmList: PropTypes.func.isRequired,
  onLoadPreviewFilm: PropTypes.func.isRequired,
  onChangeActiveFilm: PropTypes.func.isRequired,
  previewFilm: PROP_TYPES_PREVIEW_FILM,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  onButtonClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  isPreviewFilmLoaded: getLoadedPreviewFolmStatus(state),
  isFilmsLoaded: getLoadedFilmsStatus(state),
  previewFilm: getPreviewFilm(state),
  authorizationStatus: getAuthorizationStatus(state),
  activeGenre: getActiveGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadPreviewFilm() {
    dispatch(fetchPreviewFilm());
  },
  onLoadFilmList() {
    dispatch(fetchFilmList());
  },
  onChangeActiveFilm(activeFilm) {
    dispatch(changeActiveFilm(activeFilm));
  },
  onChangeFavoriteStatus(data) {
    dispatch(postFavoriteStatus(data));
  }
});

export {Main};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
