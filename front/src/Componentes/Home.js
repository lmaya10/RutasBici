import React, {useEffect, useState} from 'react';
import MisRutas from "./MisRutas.js";
import Mapa from "./Mapa.js";

function Home(props) {




  return (
    <div>

               {props.user ? (
            <div>
              <div>Welcome {props.user.displayName}</div>
                <form action={"/auth/logout"} method="POST">
                  <input type="submit" value="Logout" />
                </form>
             </div>

          ) : (
          <a href={"/auth/strava/callback"}>Please log in</a>
          )}
          <h1>Se esta mostrando este mapa</h1>
          <Mapa></Mapa>
    </div>
    );
}

export default Home;
