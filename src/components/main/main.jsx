import React, {useEffect} from 'react';
import Loading from '../loading/loading';
import PreviewFilmCard from '../preview-film-card/preview-film-card';
import Catalog from '../catalog/catalog';
import {fetchFilmList, fetchPreviewFilm} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';

const Main = () => {
  const {isFilmsLoaded, isPreviewFilmLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFilmsLoaded) {
      dispatch(fetchFilmList());
    }
  }, [isFilmsLoaded]);

  useEffect(() => {
    if (!isPreviewFilmLoaded) {
      dispatch(fetchPreviewFilm());
    }
  }, [isPreviewFilmLoaded]);


  if (!isFilmsLoaded || !isPreviewFilmLoaded) {
    return (
      <Loading />
    );
  }

  return <>
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
