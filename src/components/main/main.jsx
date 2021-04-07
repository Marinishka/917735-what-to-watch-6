import React, {useEffect} from 'react';
import Loading from '../loading/loading';
import PreviewFilmCard from '../preview-film-card/preview-film-card';
import Catalog from '../catalog/catalog';
import {fetchFilmList, fetchPreviewFilm} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';
import ErrorMessage from '../error-message/error-message';
import {catchError, redirectToRoute} from '../../store/action';
import {Routes} from '../../const';

const Main = () => {
  const isFilmsLoaded = useSelector((state) => state.DATA.isFilmsLoaded);
  const isPreviewFilmLoaded = useSelector((state) => state.DATA.isPreviewFilmLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(catchError(null));
    Promise.all([dispatch(fetchFilmList()), dispatch(fetchPreviewFilm())])
    .catch((err) => {
      dispatch(catchError(err.response));
      dispatch(redirectToRoute(Routes.ERROR));
    });
  });

  if (!isFilmsLoaded || !isPreviewFilmLoaded) {
    return (
      <Loading />
    );
  }

  return <>
    <ErrorMessage/>
    <PreviewFilmCard/>
    <div className="page-content">
      <Catalog/>
      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>;
};

export default Main;
