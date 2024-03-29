import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {checkAuth} from './store/api-actions';
import {AuthorizationStatus} from "./const";
import {redirect} from './store/middlewares/redirect.js';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth()).finally(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
});


