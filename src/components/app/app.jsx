import React, {useState} from 'react';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Routes, PROP_TYPES_PREVIEW_FILM, PROP_TYPES_FILMS} from '../../const';
import {connect} from 'react-redux';

const App = ({previewFilm, films}) => {
  let [activeFilm, setActiveFilm] = useState(previewFilm);
  let [activePreviewFilmId, setActivePreviewFilmId] = useState(previewFilm.id);

  const handleFilmClick = (film) => {
    setActiveFilm(film);
  };
  const handleFilmMouseIn = (id) => {
    setActivePreviewFilmId(id);
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.MAIN} exact>
          <Main
            previewFilm = {previewFilm}
            handleFilmClick={handleFilmClick}
            handleFilmMouseIn={handleFilmMouseIn}
            activePreviewFilmId={activePreviewFilmId}/>
        </Route>
        <Route path={Routes.SIGN_IN} exact>
          <SignIn/>
        </Route>
        <Route path={Routes.MY_LIST} exact>
          <MyList films={films} handleFilmClick={handleFilmClick}
            handleFilmMouseIn={handleFilmMouseIn}
            activePreviewFilmId={activePreviewFilmId}/>
        </Route>
        <Route path={Routes.MOVIE_PAGE} exact>
          <MoviePage film={activeFilm}
            handleFilmClick={handleFilmClick}
            handleFilmMouseIn={handleFilmMouseIn}
            activePreviewFilmId={activePreviewFilmId}/>
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
  previewFilm: PROP_TYPES_PREVIEW_FILM,
  films: PROP_TYPES_FILMS
};

const mapStateToProps = ({films}) => ({
  films
});

export {App};

export default connect(mapStateToProps)(App);
