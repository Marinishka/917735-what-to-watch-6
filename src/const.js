import PropTypes from 'prop-types';

export const INITIAL_GENRE = `All genres`;

export const Routes = {
  MAIN: `/`,
  SIGN_IN: `/login`,
  MY_LIST: `/mylist`,
  MOVIE_PAGE: `/films/:id?`,
  ADD_REVIEW: `/films/:id/review`,
  PLAYER: `/player/:id?`
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
  posterImage: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired
});
