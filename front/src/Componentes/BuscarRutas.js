import React, {useEffect, useState} from 'react';
import MapaConRuta from "./MapaConRuta.js"

function BuscarRutas(props) {
  const [paseos, setPaseos] = useState([]);
  const [err, setErr] = useState("");

	useEffect(() => {
    console.log("Entra a use effect");
		fetch("/paseos")
      .then(res => res.json())
      .then( data => {
        if(data.err) {
          console.log("Entra a error");
          setErr(JSON.stringify(data.msg));
        }
        else{
          console.log("Paseos ", data)
          setPaseos(data);
        }
      });
	}, [])


  const renderPaseos = () => paseos.map(d =>
  	<div>
      <MapaConRuta  user = {props.user} ruta = {d.idRuta}></MapaConRuta>
			<h1>{d.user}</h1>
			<br/>
  	</div>
  )

  return(
      <div>
        <div>
          <h1 className = "tituloGrupos">Rutas Actuales</h1>
          <br/>
        </div>
        <div class="ListaPaseos">
        	{renderPaseos()}
        </div>
      </div>
    )
}

export default BuscarRutas;
