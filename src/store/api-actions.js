import {loadFilms, loadPreviewFilm, requireAuthorization, redirectToRoute, changeActiveFilm, catchError} from './action';
import {APIRoutes, AuthorizationStatus, Routes, StatusCodes} from '../const';
import {adaptFilmsToClient, adaptFilmToClient} from '../utils/common';

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.FILMS)
    .then(({data}) => {
      dispatch(loadFilms(adaptFilmsToClient(data)));
    })
);

export const fetchPreviewFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.PREVIEW_FILM)
    .then(({data}) => dispatch(loadPreviewFilm(adaptFilmToClient(data))))
);

export const fetchActiveFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoutes.FILMS}/${id}`)
    .then(({data}) => {
      dispatch(catchError(null));
      dispatch(changeActiveFilm(adaptFilmToClient(data)));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((err) => {
      const {response} = err;

      if (response.status === StatusCodes.UNAUTHORIZED) {
        return;
      }

      dispatch(catchError(err.response));
      dispatch(redirectToRoute(Routes.ERROR));
    })
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(Routes.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => {
  api.get(APIRoutes.LOGOUT)
  .then(() => {
    dispatch(catchError(null));
    dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
  })
  .catch((err) => dispatch(catchError(err.response)));
};

export const postReview = ({id, starRating: rating, reviewText: comment}) => (dispatch, _getState, api) => (
  api.post(`${APIRoutes.COMMENTS}/${id}`, {rating, comment})
  .then(() => dispatch(catchError(null)))
);

export const postFavoriteStatus = ({id, status}) => (dispatch, _getState, api) => (
  api.post(`${APIRoutes.FAVORITE_MARK}/${id}/${status}`).then(({data}) => {
    dispatch(catchError(null));
    if (id === 1) {
      dispatch(loadPreviewFilm(adaptFilmToClient(data)));
    } else {
      dispatch(changeActiveFilm(adaptFilmToClient(data)));
    }
  })
  .catch((err) => dispatch(catchError(err.response)))
);
