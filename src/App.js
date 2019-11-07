// src/App.js

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { useAuth0 } from "./react-auth0-spa/react-auth0-spa";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile"
import Home from "./components/Home"
import LandingPage from "./components/LandingPage";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
  
    <div className="App">
    {/* New - use BrowserRouter to provide access to /profile */}
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <ProtectedRoute exact path="/profile" component={Profile}/>
      <ProtectedRoute exact path="/home" component={Home}/>
      
    </Switch>
    {/* <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter> */}
  </div>
);
}

export default App;