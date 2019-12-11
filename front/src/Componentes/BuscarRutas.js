import React, {useEffect, useState} from 'react';
import MapaConRutaDos from "./MapaConRutaDos.js"

function BuscarRutas(props) {

	useEffect(() => {

	}, [])

  function renderPaseos () {
     if(props.user)
      {
        return props.paseos.map(d => 
        <div className="col-md-6 col-sm-6">
          <h2>Dueño de Ruta: {d.user}</h2>
          <MapaConRutaDos  user = {props.user} ruta = {d.idRuta} fecha = {d.fecha} cupos = {d.capacidad-d.numInscritas} inscritos ={d.inscritos}></MapaConRutaDos>
          <br/>
        </div>
      )
    }
    else
    {	
      	// Sería interesante que mostraran otro tipo de información aquí para que al aplicación se siente más amigable y accesible
	return(<h1>Debe iniciar sesión para poder acceder a esta funcionalidad </h1>)
      
    }
  };

  return(
      <div>
        <div>
          <h1 className = "tituloGrupos text-center" >Rutas Actuales</h1>
          <br/>
        </div>
        <div class="ListaPaseos row">
        	{renderPaseos()}
        </div>
      </div>
    )
}

export default BuscarRutas;
