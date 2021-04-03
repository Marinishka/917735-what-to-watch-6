import {loadFilms, loadPreviewFilm, requireAuthorization, redirectToRoute, changeActiveFilm} from './action';
import {APIRoutes, AuthorizationStatus, Routes} from '../const';
import {adaptFilmsToClient, adaptFilmToClient} from '../utils/common';

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.FILMS)
    .then(({data}) => dispatch(loadFilms(adaptFilmsToClient(data))))
);

export const fetchPreviewFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.PREVIEW_FILM)
    .then(({data}) => dispatch(loadPreviewFilm(adaptFilmToClient(data))))
);

export const fetchActiveFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoutes.FILMS}/${id}`)
    .then(({data}) => dispatch(changeActiveFilm(adaptFilmToClient(data))))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))).then(() => dispatch(redirectToRoute(Routes.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => {
  api.get(APIRoutes.LOGOUT)
  .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
  .catch(() => {});
};

export const postReview = ({id, starRating: rating, reviewText: comment}) => (dispatch, _getState, api) => (
  api.post(`${APIRoutes.COMMENTS}/${id}`, {rating, comment})
  .then(() => dispatch(redirectToRoute(Routes.MOVIE_PAGE)))
);

export const postFavoriteStatus = ({id, status}) => (_, _getState, api) => (
  api.post(`${APIRoutes.FAVORITE_MARK}/${id}/${status}`)
);
