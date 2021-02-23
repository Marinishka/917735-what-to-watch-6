import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {Routes, UsePropTypes} from '../../const';

const STARS_QUANTITY = 10;
const StartState = {
  STAR_RAITING: 0,
  REVIEW_TEXT: ``
};

const AddReview = ({film}) => {
  const [, setStarRaitung] = useState(StartState.STAR_RAITING);
  const [reviewText, setReviewText] = useState(StartState.REVIEW_TEXT);
  const {name, posterImage, backgroundImage} = film;
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
      <form action="#" className="add-review__form" onSubmit={(evt) => {
        evt.preventDefault();
      }}>
        <div className="rating">
          <div className="rating__stars">
            {new Array(STARS_QUANTITY).fill(null).map((_, index) => {
              const starNumber = index + 1;
              return (
                <Fragment key={starNumber}>
                  <input className="rating__input" id={`star-${starNumber}`} type="radio" name="rating" value={starNumber} onChange={({target}) => {
                    setStarRaitung(target.value);
                  }}/>
                  <label className="rating__label" htmlFor={`star-${starNumber}`}>Rating {starNumber}</label>
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewText} onChange={({target}) => {
            setReviewText(target.value);
          }}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>

  </section>;
};

AddReview.propTypes = {
  film: UsePropTypes.FILM
};

export default AddReview;
