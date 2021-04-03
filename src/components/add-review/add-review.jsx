import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';
import {useSelector, useDispatch} from 'react-redux';
import AddReviewForm from '../add-review-form/add-review-form';
import {resetGenre} from '../../store/action';
import UserElement from '../user-element/user-element';

const AddReview = () => {
  const dispatch = useDispatch();

  const activeFilm = useSelector((state) => state.LOCAL.activeFilm);

  const {name, posterImage, backgroundImage} = activeFilm;

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
          <UserElement/>
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
