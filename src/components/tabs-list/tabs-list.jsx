import React from 'react';
import PropTypes from 'prop-types';
import {TabsTitles} from '../../const';
import TabItem from '../tab-item/tab-item';

const getTabItems = (activeTab) => {
  let tabs = [];
  for (const tabTitle in TabsTitles) {
    if (Object.prototype.hasOwnProperty.call(TabsTitles, tabTitle)) {
      tabs.push(<TabItem key={TabsTitles[tabTitle]} tabTitle={TabsTitles[tabTitle]} isTabActive={activeTab === TabsTitles[tabTitle] ? true : false}></TabItem>);
    }
  }
  return tabs;
};

const TabsList = ({activeTab, handleActiveTabChange}) => {

  return <nav className="movie-nav movie-card__nav" onClick={(evt) => handleActiveTabChange(evt.target.dataset.tab)}>
    <ul className="movie-nav__list">
      {getTabItems(activeTab)}
    </ul>
  </nav>;
};

TabsList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleActiveTabChange: PropTypes.func.isRequired
};

export default TabsList;
