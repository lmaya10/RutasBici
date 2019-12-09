import React, {useEffect, useState} from 'react';
import MapaConRuta from "./MapaConRuta.js"

function BuscarRutas(props) {

	useEffect(() => {
		
	}, [])


  const renderPaseos = () => props.paseos.map(d =>
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
