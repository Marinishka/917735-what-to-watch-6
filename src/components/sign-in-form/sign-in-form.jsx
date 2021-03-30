import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions';

const Errors = {
  BAD_REQUEST: 400,
  INVALID_LOGIN: `invalid login`
};

const SignInForm = ({onSubmit}) => {

  const loginRef = useRef();
  const passwordRef = useRef();
  const [authData, setAuthData] = useState({login: ``, password: ``});
  const [isValid, setIsValid] = useState({status: false, error: null});

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setEmailValid();
    // if (isValid.status) {
      onSubmit(authData);
    // }
  };

  const setEmailValid = () => {
    setIsValid({
      status: false,
      error: Errors.INVALID_LOGIN
    });
  };

  const getErrorMessage = () => {
    if (isValid.status) {
      switch (isValid.error) {
        case Errors.BAD_REQUEST:
          return <div className="sign-in__message">
            <p>We can’t recognize this email <br> and password combination. Please try again.</br></p>
          </div>;
        case Errors.INVALID_LOGIN:
          return <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>;
      }
    }
    return ``;
  };

  return <form action="" className="sign-in__form" onSubmit={(evt) => handleSubmit(evt)}>
    {getErrorMessage()}
    <div className="sign-in__fields">
      <div className="sign-in__field">
        <input className="sign-in__input" ref={loginRef} type="email" placeholder="Email address" name="user-email" id="user-email"
          onChange={() => setAuthData({
            ...authData,
            login: loginRef.current.value})
          }/>
        <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
      </div>
      <div className="sign-in__field">
        <input className="sign-in__input" ref={passwordRef} type="password" placeholder="Password" name="user-password" id="user-password" onChange={() => setAuthData({
          ...authData,
          password: passwordRef.current.value
        })}/>
        <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
      </div>
    </div>
    <div className="sign-in__submit">
      <button className="sign-in__btn" type="submit" >Sign in</button>
    </div>
  </form>;
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    return dispatch(login(authData));
  }
});

export {SignInForm};

export default connect(null, mapDispatchToProps)(SignInForm);
