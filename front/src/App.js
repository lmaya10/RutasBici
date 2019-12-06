import React, {useEffect, useState} from 'react';
import './App.css';
import Mapa from "./Mapa.js";
import MapaConRuta from "./MapaConRuta.js"

import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";


function App() {

  const [user, setUser] = useState(null);
  const backUrl = "http://localhost:3001";
  useEffect(() => {
    fetch("/auth/getUser")
    .then(res => res.json())
    .then(_user => {
      console.log("user", _user);

      if (_user) {
        setUser(_user);
      }
    });
  }, []); // Run only once

  return (
    <Router>
      <Switch>
        <div className="App">
          <div className = "NavBar">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="navbar-brand"><Link className="nombres" to="/">Tu Mejor Ruta</Link></div>
              <div className="navbar-brand"><Link className="nombres" to="/">Grupos</Link></div>
              <div className="navbar-brand"><Link className="nombres" to="/">Nuevo Grupo</Link></div>
            </nav>
          </div>
          <h1>Strava react</h1>

          {user ? (
            <div>
              <div>Welcome {user.displayName}</div>
                <form action={"/auth/logout"} method="POST">
                  <input type="submit" value="Logout" />
                </form>
                <MapaConRuta user={user}></MapaConRuta>
          
             </div>

          ) : (
          <a href={"/auth/strava/callback"}>Please log in</a>
          )}

          <Mapa></Mapa>
          <MapaConRuta user={user} />
          </div>
        </Switch>
      </Router>
      );
}

export default App;
