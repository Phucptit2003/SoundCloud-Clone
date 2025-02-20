import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import Dashboard from "./components/Dashboard";
import SongPage from "./components/SongPage";
import UploadForm from "./components/UploadForm";
import MyAlbum from "./components/MyAlbum";
import { getAllSongs } from "./store/songs";
import MySong from "./components/MySong";
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(getAllSongs());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songsRed.songs);

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
          
          {/* Nếu user chưa đăng nhập, chuyển hướng về trang login */}
          <Route path="/myalbum/:userId">
            {sessionUser ? <MyAlbum isLoaded={isLoaded} /> : <Redirect to="/dashbroad" />}
          </Route>
          <Route path="/mysong/:userId">
            {sessionUser ? <MySong isLoaded={isLoaded} /> : <Redirect to="/dashbroad" />}
          </Route>

          <Route path="/upload">
            <Navigation isLoaded={isLoaded} />
            <UploadForm />
          </Route>

          {/* Route mặc định: Nếu không khớp với bất kỳ đường dẫn nào, quay lại trang chủ */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
