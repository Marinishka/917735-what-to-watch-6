import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import films from './mocks/films';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());

const data = {
  previewFilm: {
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
  }
};

ReactDOM.render(
    <Provider store={store}>
      <App previewFilm = {data.previewFilm}
        films = {films}/>
    </Provider>,
    document.querySelector(`#root`)
);
