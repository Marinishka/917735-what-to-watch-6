import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';
import useAPI from '../../hooks/useAPI';
import Loading from '../loading/loading';
import MoviesList from '../movies-list/movies-list';
import {adaptFilmsToClient} from '../../utils/common';
import {useDispatch} from 'react-redux';
import {resetGenre} from '../../store/action';
import UserElement from '../user-element/user-element';

const MyList = () => {
  const dispatch = useDispatch((state) => state.USER);

  const [films, isLoading] = useAPI(`/favorite`);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={Routes.MAIN} className="logo__link" onClick={() => (dispatch(resetGenre()))}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <div className="user-block">
        <UserElement/>
      </div>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {films.length !== 0
        ? <MoviesList films={adaptFilmsToClient(films)} quantity={films.length}/>
        : <div>Your list is empty. Add your first movie</div>}

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
  </div>;
};

export default MyList;
