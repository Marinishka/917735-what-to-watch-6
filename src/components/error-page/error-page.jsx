import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {resetGenre} from '../../store/action';
import {Routes} from '../../const';
import {useDispatch} from 'react-redux';

const ErrorPage = ({message}) => {
  const dispatch = useDispatch();

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
    <h1 className="page-title user-page__title">{message}</h1>
    <Link to={Routes.MAIN} className="logo__link logo__link--light" style={{width: `auto`, height: `auto`, padding: `10px 20px`}} onClick={() => (dispatch(resetGenre()))}>Back to main</Link>
  </div>;
};

ErrorPage.propTypes = {
  message: PropTypes.string
};

export default ErrorPage;
