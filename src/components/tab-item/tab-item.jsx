import React from 'react';
import PropTypes from 'prop-types';

const TabItem = ({tabTitle, isTabActive}) => {
  return <li className={`movie-nav__item ${isTabActive ? `movie-nav__item--active` : ``}`}>
    <a data-tab={tabTitle} className="movie-nav__link">{tabTitle}</a>
  </li>;
};

TabItem.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  isTabActive: PropTypes.bool.isRequired
};

export default TabItem;
