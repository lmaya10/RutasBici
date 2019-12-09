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
            <div className="col-md-10 offset-md-1">
              <Mapa></Mapa>
            </div>
          </div>
          <div>

          </div>
    </div>
    );
}

export default Home;
