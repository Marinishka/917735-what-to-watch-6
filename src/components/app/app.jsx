import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {previewFilm} = props;
  return (<Main previewFilm = {previewFilm}/>);
};

App.propTypes = {
  previewFilm: PropTypes.object.isRequired
};

export default App;
