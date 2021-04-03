import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, AuthorizationStatus} from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import AddReviewForm from '../add-review-form/add-review-form';
import {logout} from '../../store/api-actions';
import {resetGenre} from '../../store/action';

const AddReview = () => {
  const {activeFilm} = useSelector((state) => state.LOCAL);

  const {authorizationStatus} = useSelector((state) => state.USER);

  const {name, posterImage, backgroundImage} = activeFilm;

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

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
          <Link to={Routes.MAIN} className="logo__link" onClick={() => (dispatch(resetGenre()))}>
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
      <AddReviewForm></AddReviewForm>
    </div>

  </section>;
};

export default AddReview;
