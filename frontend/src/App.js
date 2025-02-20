import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Dashboard from "./components/Dashboard";
import SongPage from "./components/SongPage";
import UploadForm from "./components/UploadForm";
import UpgradePremium from "./components/Upgrade.js"
import PaymentForm from "./components/Payment/index.js";
import PaymentSuccess from "./components/Payment/success.js";
import PaymentFailed from "./components/Payment/failed.js";

import { getAllSongs } from "./store/songs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllSongs());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const songs = useSelector((state) => state.songsRed.songs);
  // console.log(songs);

  return (
    <div id="container">
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Splash isLoaded={isLoaded} />
          </Route>
          <Route path="/dashboard">
            <Dashboard isLoaded={isLoaded} />
          </Route>
          <Route path="/songs/:songId">
            <SongPage isLoaded={isLoaded} />
          </Route>
          <Route path="/upload">
            <Navigation isLoaded={isLoaded} />
            <UploadForm />
          </Route>
          <Route path="/upgrade">
            <Navigation isLoaded={isLoaded} />
            <UpgradePremium />
          </Route>
          <Route path="/payment">
            <Navigation isLoaded={isLoaded} />
            <PaymentForm />
          </Route>
          <Route path="/payment-success">
            <Navigation isLoaded={isLoaded} />
            <PaymentSuccess />
          </Route>
          <Route path="/payment-failed">
            <Navigation isLoaded={isLoaded} />
            <PaymentFailed />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
