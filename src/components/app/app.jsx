import React from 'react';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {Routes} from '../../const';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import ErrorPage from '../error-page/error-page';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={Routes.MAIN} exact render={() => {
          return <Main/>;
        }}/>
        <Route path={Routes.SIGN_IN} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          path={Routes.MY_LIST}
          exact
          render={() => <MyList/>}>
        </PrivateRoute>
        <Route path={Routes.MOVIE_PAGE} exact render={() => {
          return <MoviePage/>;
        }}/>
        <PrivateRoute
          path={Routes.ADD_REVIEW}
          exact
          render={() => {
            return <AddReview/>;
          }}>
        </PrivateRoute>
        <Route path={Routes.PLAYER} exact render={() => {
          return <Player/>;
        }}/>
        <Route path={Routes.NOT_FOUND} exact>
          <NotFound />
        </Route>
        <Route path={`/error`} exact>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
