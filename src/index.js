import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import rootReducer from './store/root-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requireAuthorization} from './store/action';
import {checkAuth} from './store/api-actions';
import {AuthorizationStatus} from "./const";
import {redirect} from './store/middlewares/redirect.js';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)), applyMiddleware(redirect)));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
