import React, {useState} from 'react';
import {PROP_TYPES_FILM, TabsTitles} from '../../const';
import MovieDetails from '../movie-details/movie-details';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReviews from '../movie-reviews/movie-reviews';
import TabsList from '../tabs-list/tabs-list';

const getActiveElement = (activeTab, film) => {
  switch (activeTab) {
    case TabsTitles.OVERVIEW:
      return <MovieOverview film={film}></MovieOverview>;
    case TabsTitles.REVIEWS:
      return <MovieReviews id={film.id}></MovieReviews>;
    case TabsTitles.DETAILS:
      return <MovieDetails film={film}></MovieDetails>;
    default: return <MovieOverview film={film}></MovieOverview>;
  }
};

const Tabs = ({film}) => {
  const [activeTab, setActiveTab] = useState(TabsTitles.OVERVIEW);

  const handleActiveTabChange = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  return <div className="movie-card__desc">
    <TabsList activeTab={activeTab} handleActiveTabChange={handleActiveTabChange}></TabsList>
    {getActiveElement(activeTab, film)}
  </div>;
};

Tabs.propTypes = {
  film: PROP_TYPES_FILM
};

export default Tabs;
