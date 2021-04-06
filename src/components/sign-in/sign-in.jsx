import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AuthorizationStatus, Routes} from '../../const';
import {resetGenre} from '../../store/action';
import SignInForm from '../sign-in-form/sign-in-form';
import {useDispatch, useSelector} from 'react-redux';

const SignIn = () => {
  const dispatch = useDispatch();
  const authorisationStatus = useSelector((state) => state.USER.authorisationStatus);

  if (authorisationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={Routes.MAIN}/>;
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

      <h1 className="page-title user-page__title">Sign in</h1>
    </header>

    <div className="sign-in user-page__content">
      <SignInForm/>
    </div>

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
  </div>;
};

export default SignIn;
