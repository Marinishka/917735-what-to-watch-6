import React from 'react';
import PropTypes from 'prop-types';

const GenresItem = ({genre, activeGenre}) => {
  return <li className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`}>
    <a data-genre={genre} href="#" className="catalog__genres-link">{genre}</a>
  </li>;
};

GenresItem.propTypes = {
  genre: PropTypes.string.isRequired,
  activeGenre: PropTypes.string.isRequired
};

export default GenresItem;
