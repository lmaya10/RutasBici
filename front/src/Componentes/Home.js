import React, {useEffect, useState} from 'react';
import MisRutas from "./MisRutas.js";
import Mapa from "./Mapa.js";

function Home(props) {
  const[ub,setUb]=useState([]);

  useEffect(() => {

  }, [])

  return (
    <div>
          <div>
            <h1>Este es el Home. Toca editarlo para agregar toda la info que sea necesaria</h1>
            <div className="col-md-10 offset-md-1">
              <Mapa></Mapa>
            </div>
          </div>
          <div>
            <h1> Aca va toda la descripción de la pagina</h1>
          </div>
    </div>
    );
}

export default Home;
