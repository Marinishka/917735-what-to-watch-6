import {ActionCreator} from './action';
import {APIRoutes, AuthorizationStatus, Routes} from '../const';
import {adaptFilmsToClient} from '../utils/common';

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadFilms(adaptFilmsToClient(data))))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH))).then(() => dispatch(ActionCreator.redirectToRoute(Routes.MAIN)))
);
