import {INITIAL_GENRE, AuthorizationStatus} from '../const';
import {getAllGenres} from '../utils/common';
import {ActionType} from './action';

const previewFilmMock = {
  id: 0,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
  previewImage: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#ffffff`,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014,
  runTime: 108,
  rating: 8.9,
  scoresCount: 240,
  videoLink: `https://upload.wikimedia.org/wikipedia/commons/d/d1/NASA%27s_Mars_2020_Perseverance_Rover_Landing_Animations-rzmd7RouGrM.webm`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/d/d1/NASA%27s_Mars_2020_Perseverance_Rover_Landing_Animations-rzmd7RouGrM.webm`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  isFavorite: true
};

const initialState = {
  activeGenre: INITIAL_GENRE,
  films: [],
  allGenres: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  previewFilm: previewFilmMock,
  activeFilm: previewFilmMock
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        activeGenre: action.payload
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
        allGenres: getAllGenres(action.payload)
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.CHANGE_ACTIVE_FILM:
      return {
        ...state,
        activeFilm: action.payload
      };
  }

  return state;
};

export {reducer};
