import React, {useEffect, useState} from 'react';
import MisRutas from "./MisRutas.js";
import Mapa from "./Mapa.js";
import Tabla from "./Tabla.js";
import Instrucciones  from "./Instrucciones.js"

function Home(props) {
  const[ub,setUb]=useState([]);

  useEffect(() => {

  }, [])

  return (
    <div>
          <div>
            <div className="col-md-10 offset-md-1">
              <Mapa></Mapa>

              <Tabla></Tabla>
              <Instrucciones></Instrucciones>
            </div>
          </div>
          <div>

          </div>
    </div>
    );
}

export default Home;
