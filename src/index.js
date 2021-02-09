import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
const data = {
  previewFilm: {
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    name: `The Grand Budapest Hotel`,
    genre: `Drama`,
    released: 2014
  }
};

ReactDOM.render(
    <App previewFilm = {data.previewFilm}/>,
    document.querySelector(`#root`)
);
