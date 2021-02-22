import React, {useState} from 'react';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Routes, UsePropTypes} from '../../const';

const App = ({previewFilm, films}) => {
  let [activeFilm, setActiveFilm] = useState(previewFilm);

  const handleFilmClick = (film) => {
    setActiveFilm(film);
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} exact>
          <Main
            previewFilm = {previewFilm}
            films = {films}
            handleFilmClick={handleFilmClick}/>
        </Route>
        <Route path={Routes.SIGN_IN} exact>
          <SignIn/>
        </Route>
        <Route path={Routes.MY_LIST} exact>
          <MyList films={films} handleFilmClick={handleFilmClick}/>
        </Route>
        <Route path={Routes.MOVIE_PAGE} exact>
          <MoviePage film={activeFilm} films={films} handleFilmClick={handleFilmClick}/>
        </Route>
        <Route path={Routes.ADD_REVIEW} exact>
          <AddReview film={activeFilm} />
        </Route>
        <Route path={Routes.PLAYER} exact>
          <Player film={activeFilm}/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  previewFilm: UsePropTypes.PREVIEW_FILM,
  films: UsePropTypes.FILMS
};

export default App;
