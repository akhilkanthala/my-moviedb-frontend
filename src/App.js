// src/App.js

import React from "react";
import { useAuth0 } from "./react-auth0-spa/react-auth0-spa";
import history from "./utils/history";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import Discover from "./components/Discover";
import LandingPage from "./components/LandingPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import AppBar from "./components/AppBar";
import MoviePage from "./components/MoviePage";
import Favourite from "./components/Favourites";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute path="/discover" component={Discover} />
          <ProtectedRoute path="/favourite" component={Favourite} />
          <ProtectedRoute
            path="/movie/:movieName"
            component={props => <MoviePage {...props} />}
          />
          <ProtectedRoute
            path="/tv/:tvName"
            component={props => <MoviePage {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
