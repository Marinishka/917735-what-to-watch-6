import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus, Routes} from '../../const';
import {useSelector} from 'react-redux';

const PrivateRoute = ({render, path, exact}) => {
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={Routes.SIGN_IN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
