import React from 'react';
import {Link} from 'react-router-dom';
import {Routes, PROP_TYPES_FILM} from '../../const';
import {connect} from 'react-redux';
import AddReviewForm from '../add-review-form/add-review-form';
import {getActiveFilm} from '../../store/local-state/selectors';

const AddReview = ({activeFilm}) => {
  const {name, posterImage, backgroundImage} = activeFilm;

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
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
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

AddReview.propTypes = {
  activeFilm: PROP_TYPES_FILM
};

const mapStateToProps = (state) => ({
  activeFilm: getActiveFilm(state)
});

export {AddReview};

export default connect(mapStateToProps)(AddReview);
