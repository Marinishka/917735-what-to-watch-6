import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {redirectToRoute, resetGenre} from '../../store/action';
import {Routes, StatusCodes} from '../../const';
import {useDispatch, useSelector} from 'react-redux';

const ErrorPage = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.LOCAL.error);

  const getResponseErrorMessage = () => {
    let message = `We don't know what happened`;
    if (error === null) {
      dispatch(redirectToRoute(Routes.MAIN));
    } else if (error === undefined) {
      message = `Internet connection error. Check the connection.`;
    } else if (error.status === StatusCodes.BAD_REQUEST) {
      message = `Invalid request sent`;
    } else if (error.status >= StatusCodes.SERVER_ERROR_FIRST && error.status <= StatusCodes.SERVER_ERROR_LAST) {
      message = `We have something broken on server. Films has not been loaded. Try again later.`;
    } else if (error.status === StatusCodes.NOT_FOUND) {
      history.push(Routes.NOT_FOUND);
    }
    return message;
  };

  return <div className="user-page">
    <h1 className="visually-hidden">WTW</h1>
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={Routes.MAIN} className="logo__link" onClick={() => (dispatch(resetGenre()))}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
    </header>
    <h1 className="page-title user-page__title">{getResponseErrorMessage()}</h1>
    <Link to={Routes.MAIN} className="logo__link logo__link--light" style={{width: `auto`, height: `auto`, padding: `10px 20px`}} onClick={() => (dispatch(resetGenre()))}>Back to main</Link>
  </div>;
};

ErrorPage.propTypes = {
  message: PropTypes.string
};

export default ErrorPage;
