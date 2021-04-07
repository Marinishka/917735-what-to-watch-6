import React from 'react';
import {useSelector} from 'react-redux';
import {StatusCodes} from '../../const';

const ErrorMessage = () => {
  const error = useSelector((state) => state.LOCAL.error);
  const getResponseErrorMessage = () => {
    let message = `We don't know what happened, try again later.`;
    if (error === undefined) {
      message = `Internet connection error. Check the connection and try again.`;
    } else if (error.status === StatusCodes.BAD_REQUEST) {
      message = `Invalid request sent.`;
    } else if (error.status >= StatusCodes.SERVER_ERROR_FIRST && error.status <= StatusCodes.SERVER_ERROR_LAST) {
      message = `We have something broken on server. Try again later.`;
    }
    return message;
  };

  const getErrorMessage = () => {
    if (error !== null) {
      return <div>{getResponseErrorMessage()}</div>;
    } else {
      return ``;
    }
  };

  return getErrorMessage();
};

export default ErrorMessage;
