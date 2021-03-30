import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, PROP_TYPES_FILM, QuantityFilmsOnPage, AuthorizationStatus, APIRoutes} from '../../const';
import MoviesList from '../movies-list/movies-list';
import {connect} from 'react-redux';
import Tabs from '../tabs/tabs';
import PropTypes from 'prop-types';
import {getActiveFilm} from '../../store/local-state/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {logout, postFavoriteStatus} from '../../store/api-actions';
import {useHistory} from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Loading from '../loading/loading';
import {adaptFilmToClient} from '../../utils/common';

const MoviePage = ({activeFilm, authorizationStatus, onChangeFavoriteStatus, onLogout}) => {
  const {id} = activeFilm;

  const [film, isLoading] = useAPI(`${APIRoutes.FILMS}/${id}`);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const {backgroundImage,
    name,
    genre,
    released,
    posterImage,
    isFavorite} = adaptFilmToClient(film);

  const history = useHistory();

  const getUserElement = (status) => {
    return status === AuthorizationStatus.AUTH
      ? <><div className="user-block__avatar">
        <Link to={Routes.MY_LIST}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
      </div>
      <div onClick={() => (onLogout())}>Sign out</div>
      </>
      : <Link to={Routes.SIGN_IN} className="user-block__link">Sign in</Link>;
  };

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={Routes.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="user-block">
            {getUserElement(authorizationStatus)}
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => {
                history.push(`/player/${id}`);
              }}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={() => {
                if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                  history.push(Routes.SIGN_IN);
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
              {authorizationStatus === AuthorizationStatus.AUTH ? <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link> : ``}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
          </div>

          <Tabs film={activeFilm}></Tabs>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList quantity={QuantityFilmsOnPage.MOVIE_PAGE}/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={Routes.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

MoviePage.propTypes = {
  activeFilm: PROP_TYPES_FILM,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  onChangeFavoriteStatus: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeFilm: getActiveFilm(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFavoriteStatus(data) {
    dispatch(postFavoriteStatus(data));
  },
  onLogout() {
    dispatch(logout());
  }
});

export {MoviePage};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
