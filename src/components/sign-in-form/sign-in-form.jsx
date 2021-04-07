import React, {useState} from 'react';
import {login} from '../../store/api-actions';
import {useDispatch} from 'react-redux';
import {CONNECTION_ERROR, INITIAL_GENRE, StatusCodes} from '../../const';
import {changeGenre} from '../../store/action';

const SignInForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [isDisabled, setDisabled] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (email.trim().length === 0) {
      setError(`Login is required`);
      return;
    }

    if (password.trim().length === 0) {
      setError(`Password is required`);
      return;
    }

    if (!email.match(/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/)) {
      setError(`Please enter a valid email address`);
      return;
    }

    setError(null);
    setDisabled(true);
    dispatch(changeGenre(INITIAL_GENRE));
    dispatch(login({email, password}))
    .catch((err) => {
      getResponseErrorMessage(err);
      setDisabled(false);
    });
  };

  const getResponseErrorMessage = (err) => {
    if (err.message === CONNECTION_ERROR) {
      setError(`Internet connection error. Check the connection.`);
    } else if (err.response.status === StatusCodes.BAD_REQUEST) {
      setError(`We can’t recognize this email and password combination. Please try again.`);
    } else if (err.response.status >= StatusCodes.SERVER_ERROR_FIRST && err.response.status <= StatusCodes.SERVER_ERROR_LAST) {
      setError(`We have something broken on server. Try again later.`);
    }
  };

  const getErrorMessage = () => {
    if (error !== null) {
      return <div className="sign-in__message">
        <p>{error}</p>
      </div>;
    }
    return ``;
  };

  return <form action="" className="sign-in__form" onSubmit={handleSubmit} noValidate>
    {getErrorMessage()}
    <div className="sign-in__fields">
      <div className="sign-in__field">
        <input className="sign-in__input" placeholder="Email address" name="email" type="email" id="user-email"
          onChange={(evt) => setEmail(evt.target.value)
          }/>
        <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
      </div>
      <div className="sign-in__field">
        <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" onChange={(evt) => setPassword(evt.target.value)}/>
        <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
      </div>
    </div>
    <div className="sign-in__submit">
      <button className="sign-in__btn" type="submit" disabled={isDisabled}>Sign in</button>
    </div>
  </form>;
};

export default SignInForm;
