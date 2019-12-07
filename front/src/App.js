import React, {useEffect, useState} from 'react';
import './App.css';

import MapaConRuta from "./Componentes/MapaConRuta.js";
import Home from "./Componentes/Home.js";
import MisRutas from "./Componentes/MisRutas.js";
import BuscarRutas from "./Componentes/BuscarRutas.js";

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
              <div className="navbar-brand"><Link className="nombres" to="/misRutas">Mis Rutas</Link></div>
              <div className="navbar-brand"><Link className="nombres" to="/buscarRutas">Buscar Rutas</Link></div>
              <ul class="navbar-nav ml-auto">
                {user ?
                <div>
                  <div className="navbar-brand">
                    <form className="btn" action={"/auth/logout"} method="POST">
                      <input className="btn" type="submit" value="Logout" />
                    </form></div>
                  </div>:
                <div>
                  <div className="navbar-brand"> <a className="btn" href={"/auth/strava/callback"}>LogIn</a></div>
                </div>}
              </ul>
            </nav>
          </div>
          <div className="container">
            <Route path='/' render = {(props) => <Home {...props} user = {user}  />} exact/>
            <Route path='/misRutas' render = {(props) => <MisRutas {...props} user = {user} />} />
            <Route path='/buscarRutas' render = {(props) => <BuscarRutas {...props} user = {user} />} />
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
