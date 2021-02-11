import React from 'react';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

const App = ({previewFilm}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Main previewFilm = {previewFilm}/>
        </Route>
        <Route path='/login' exact>
          <SignIn/>
        </Route>
        <Route path='/mylist' exact>
          <MyList/>
        </Route>
        <Route path='/films/:id?' exact>
          <MoviePage/>
        </Route>
        <Route path='/films/:id/review' exact>
          <AddReview/>
        </Route>
        <Route path='/player/:id?' exact>
          <Player/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  previewFilm: PropTypes.shape({
    posterImg: PropTypes.string.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired
  })
};

export default App;
