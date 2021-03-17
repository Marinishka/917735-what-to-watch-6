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

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={Routes.MAIN} exact render={({history}) => {
          return <Main onButtonPlayerClick={(url) => history.push(url)}/>;
        }}/>
        <Route path={Routes.SIGN_IN} exact>
          <SignIn/>
        </Route>
        <PrivateRoute
          path={Routes.MY_LIST}
          exact
          render={() => <MyList/>}>
        </PrivateRoute>
        <Route path={Routes.MOVIE_PAGE} exact render={({history}) => {
          return <MoviePage onButtonPlayerClick={(url) => history.push(url)}/>;
        }}/>
        <PrivateRoute
          path={Routes.ADD_REVIEW}
          exact
          render={() => <AddReview/>}>
        </PrivateRoute>
        <Route path={Routes.PLAYER} exact render={({history}) => {
          return <Player onExitClick={() => history.goBack()}/>;
        }}/>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
