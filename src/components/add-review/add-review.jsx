import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, PROP_TYPES_FILM, AuthorizationStatus} from '../../const';
import {connect} from 'react-redux';
import AddReviewForm from '../add-review-form/add-review-form';
import {getActiveFilm} from '../../store/local-state/selectors';
import PropTypes from 'prop-types';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {logout} from '../../store/api-actions';

const AddReview = ({activeFilm, onButtonClick, authorizationStatus, onLogout}) => {
  const {name, posterImage, backgroundImage} = activeFilm;

  const getUserElement = (status) => {
    return status === AuthorizationStatus.AUTH
      ? <><div className="user-block__avatar">
        <Link to={Routes.MY_LIST}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
      </div>
      <div onClick={() => (onLogout())}>Sign out</div>
      </>
      : <Link to={Routes.SIGN_IN} className="user-block__link">Sign in</Link>;
  };

  return <section className="movie-card movie-card--full">
    <div className="movie-card__header">
      <div className="movie-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <Link to={Routes.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={Routes.MOVIE_PAGE} className="breadcrumbs__link">{name}</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>

        <div className="user-block">
          {getUserElement(authorizationStatus)}
        </div>
      </header>

      <div className="movie-card__poster movie-card__poster--small">
        <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
      </div>
    </div>

    <div className="add-review">
      <AddReviewForm onButtonClick={onButtonClick}></AddReviewForm>
    </div>

  </section>;
};

AddReview.propTypes = {
  activeFilm: PROP_TYPES_FILM,
  onButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]),
  onLogout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeFilm: getActiveFilm(state),
  authorizationStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export {AddReview};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
