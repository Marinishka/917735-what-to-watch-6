import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Routes, QuantityFilmsOnPage, AuthorizationStatus, StatusCode} from '../../const';
import MoviesList from '../movies-list/movies-list';
import Tabs from '../tabs/tabs';
import {fetchActiveFilm, fetchFilmList, postFavoriteStatus} from '../../store/api-actions';
import {useHistory, useParams} from 'react-router-dom';
import Loading from '../loading/loading';
import {getFilteredFilms} from '../../utils/common';
import {useSelector, useDispatch} from 'react-redux';
import {changeGenre, resetGenre} from '../../store/action';
import UserElement from '../user-element/user-element';

const MoviePage = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);

  const films = useSelector((state) => state.DATA.films);

  useEffect(() => {
    const actions = [dispatch(fetchActiveFilm(id))];
    if (films.length === 0) {
      actions.push(dispatch(fetchFilmList()));
    }
    Promise.all(actions).then(() => setLoading(false)).catch((error) => {
      if (error.response.status === StatusCode.NOT_FOUND) {
        history.push(Routes.NOT_FOUND);
      }
    });
  }, []);

  const activeFilm = useSelector((state) => state.LOCAL.activeFilm);
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);
  const history = useHistory();

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
    isFavorite} = activeFilm;

  dispatch(changeGenre(genre));
  const filteredFilms = getFilteredFilms(genre, films);

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={Routes.MAIN} className="logo__link" onClick={() => (dispatch(resetGenre()))}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="user-block">
            <UserElement/>
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
                history.push(`${Routes.PLAYER}/${id}`);
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
                  const status = Number(!isFavorite);
                  dispatch(postFavoriteStatus({id, status}));
                }
              }}>
                {isFavorite
                  ? <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  : <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>}
                <span>My list</span>
              </button>
              {authorizationStatus === AuthorizationStatus.AUTH ? <Link to={`${id}/review`} className="btn movie-card__button">Add review</Link> : ``}
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

        <MoviesList quantity={QuantityFilmsOnPage.MOVIE_PAGE} films={filteredFilms}/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={Routes.MAIN} className="logo__link logo__link--light" onClick={() => (dispatch(resetGenre()))}>
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

export default MoviePage;
