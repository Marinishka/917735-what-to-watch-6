import React, {useEffect} from 'react';
import Loading from '../loading/loading';
import PreviewFilmCard from '../preview-film-card/preview-film-card';
import Catalog from '../catalog/catalog';
import {fetchFilmList, fetchPreviewFilm} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';
import ErrorPage from '../error-page/error-page';
import {CONNECTION_ERROR, Routes, StatusCodes} from '../../const';
import {useHistory} from 'react-router';

const Main = () => {
  const isFilmsLoaded = useSelector((state) => state.DATA.isFilmsLoaded);
  const isPreviewFilmLoaded = useSelector((state) => state.DATA.isPreviewFilmLoaded);
  const dispatch = useDispatch();
  const history = useHistory();

  const getResponseErrorMessage = (err) => {
    let message = `We don't know what happened`;
    if (err.message === CONNECTION_ERROR) {
      message = `Internet connection error. Check the connection.`;
    } else if (err.response.status === StatusCodes.BAD_REQUEST) {
      message = `Invalid request sent`;
    } else if (err.response.status >= StatusCodes.SERVER_ERROR_FIRST && err.response.status <= StatusCodes.SERVER_ERROR_LAST) {
      message = `We have something broken on server. Films has not been loaded. Try again later.`;
    } else if (err.response.status === StatusCodes.NOT_FOUND) {
      history.push(Routes.NOT_FOUND);
    }
    return message;
  };

  useEffect(() => {
    if (!isFilmsLoaded) {
      dispatch(fetchFilmList())
      .catch((err) => {
        return <ErrorPage message={getResponseErrorMessage(err)}/>;
      });
    }
  }, [isFilmsLoaded]);

  useEffect(() => {
    if (!isPreviewFilmLoaded) {
      dispatch(fetchPreviewFilm())
      .catch((err) => {
        return <ErrorPage message={getResponseErrorMessage(err)}/>;
      });
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
