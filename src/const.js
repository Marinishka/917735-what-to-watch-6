import PropTypes from 'prop-types';

export const UNIT_OF_TIME = 60;

export const BACKEND_URL = `https://6.react.pages.academy/wtw`;

export const REQUEST_TIMEOUT = 5000;

export const REVIEWS_ROWS = 3;

export const INITIAL_GENRE = `All genres`;

export const STARS_QUANTITY = 10;

export const StatusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  SERVER_ERROR_FIRST: 500,
  SERVER_ERROR_LAST: 509
};

export const CONNECTION_ERROR = `Network Error`;

export const StartState = {
  STAR_RATING: null,
  REVIEW_TEXT: ``
};

export const TextLenghtValid = {
  MIN: 50,
  MAX: 400
};

export const TabsTitles = {
  OVERVIEW: `Overview`,
  REVIEWS: `Reviews`,
  DETAILS: `Details`
};

export const APIRoutes = {
  FILMS: `/films`,
  LOGIN: `/login`,
  LOGOUT: `logout`,
  PREVIEW_FILM: `/films/promo`,
  FAVORITE_MARK: `/favorite`,
  COMMENTS: `/comments`
};

export const Routes = {
  MAIN: `/`,
  SIGN_IN: `/login`,
  MY_LIST: `/mylist`,
  MOVIE_PAGE: `/films/:id?`,
  ADD_REVIEW: `/films/:id/review`,
  PLAYER: `/player/:id?`,
  NOT_FOUND: `/not_found`,
  ERROR: `/error`
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const RatingLevels = [
  {
    MIN_LEVEL: 0,
    MAX_LEVEL: 3,
    TEXT: `Bad`
  }, {
    MIN_LEVEL: 4,
    MAX_LEVEL: 5,
    TEXT: `Normal`
  }, {
    MIN_LEVEL: 6,
    MAX_LEVEL: 8,
    TEXT: `Good`
  }, {
    MIN_LEVEL: 9,
    MAX_LEVEL: 10,
    TEXT: `Very good`
  }, {
    MIN_LEVEL: 10,
    MAX_LEVEL: 10,
    TEXT: `Awesome`
  }
];

export const QuantityFilmsOnPage = {
  MAIN: 8,
  MOVIE_PAGE: 4
};

export const PROP_TYPES_FILM = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  scoresCount: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired),
  runTime: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired
}).isRequired;
export const PROP_TYPES_FILMS = PropTypes.arrayOf(PROP_TYPES_FILM);
export const PROP_TYPES_PREVIEW_FILM = PropTypes.shape({
  posterImage: PropTypes.string,
  backgroundImage: PropTypes.string,
  name: PropTypes.string,
  genre: PropTypes.string,
  released: PropTypes.number
});
