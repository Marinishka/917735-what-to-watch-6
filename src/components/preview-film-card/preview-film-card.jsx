import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, PROP_TYPES_PREVIEW_FILM, Routes} from '../../const';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getPreviewFilm} from '../../store/data/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {changeActiveFilm} from '../../store/action';
import {logout, postFavoriteStatus} from '../../store/api-actions';

const PreviewFilmCard = ({previewFilm, authorizationStatus, onChangeActiveFilm, сhangeFavoriteStatus, onLogout}) => {
  const {backgroundImage, name, posterImage, genre, released, isFavorite, id} = previewFilm;

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
              history.push(`/player/${id}`);
            }}><svg viewBox="0 0 19 19" width="19" height="19"><use xlinkHref="#play-s">
              </use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list movie-card__button" type="button" onClick={() => {
              if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                history(Routes.SIGN_IN);
              } else {
                const status = Number(!isFavorite);
                сhangeFavoriteStatus({id, status});
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

PreviewFilmCard.propTypes = {
  onChangeActiveFilm: PropTypes.func,
  previewFilm: PROP_TYPES_PREVIEW_FILM,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  сhangeFavoriteStatus: PropTypes.func,
  onLogout: PropTypes.func
};

const mapStateToProps = (state) => ({
  previewFilm: getPreviewFilm(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeActiveFilm(activeFilm) {
    dispatch(changeActiveFilm(activeFilm));
  },
  сhangeFavoriteStatus(data) {
    dispatch(postFavoriteStatus(data));
  },
  onLogout() {
    dispatch(logout());
  }
});

export {PreviewFilmCard};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewFilmCard);
