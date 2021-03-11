import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Routes, RatingLevels, PROP_TYPES_FILM, PROP_TYPES_FILMS, QuantityFilmsOnPage} from '../../const';
import MoviesList from '../movies-list/movies-list';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const getRaitingText = (rating) => {
  const raitingLevel = RatingLevels.filter((level) => {
    return rating >= level.MIN_LEVEL || rating < level.MAX_LEVEL;
  });
  return raitingLevel.TEXT;
};

const MoviePage = ({film, films, handleFilmClick, handleFilmMouseIn, activePreviewFilmId}) => {
  const {backgroundImage,
    name,
    genre,
    released,
    posterImage,
    rating,
    scoresCount,
    director,
    starring,
    description,
    id} = film;
  const history = useHistory();
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
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
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
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRaitingText(rating)}</span>
                <span className="movie-rating__count">{scoresCount} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{description}</p>

              <p className="movie-card__director"><strong>Director: {director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList films={films} handleFilmClick={handleFilmClick} quantity={QuantityFilmsOnPage.MOVIE_PAGE} handleFilmMouseIn={handleFilmMouseIn} activePreviewFilmId={activePreviewFilmId}/>
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
  film: PROP_TYPES_FILM,
  films: PROP_TYPES_FILMS,
  handleFilmClick: PropTypes.func.isRequired,
  handleFilmMouseIn: PropTypes.func.isRequired,
  activePreviewFilmId: PropTypes.oneOfType([
    PropTypes.oneOf([`null`]), PropTypes.number
  ])
};

const mapStateToProps = ({films}) => ({
  films
});

export {MoviePage};

export default connect(mapStateToProps)(MoviePage);
