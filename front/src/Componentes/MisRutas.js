import React, {useEffect, useState} from 'react';
import MapaConRuta from "./MapaConRuta.js"

function MisRutas(props) {

	const [rutas, setRutas] = useState([]);

	useEffect(() => {
	if(props.user)
	{
		let token = "Bearer "+ props.user.token;
		let myHeaders = new Headers();
		myHeaders.append("Authorization", token);
		let idUser = props.user.id;


		let myInit = { method: 'GET',
		headers: {
			'Authorization': token
		},
		mode: 'cors',
		cache: 'default' };

		let url = "https://www.strava.com/api/v3/athletes/"+idUser+"/routes";

		fetch(url, myInit)
    .then(res => res.json())
    .then(rutasUser => {
      let rutasUsuario = []
      for(let i = 0; i < rutasUser.length ; i ++)
      {
      	rutasUsuario.push(rutasUser[i].id)
      }
      setRutas(rutasUsuario);

    });
	}

  }, []); // Run only once

  function renderRutas() {
  	if(props.user){
  		if(rutas.length > 0)
  		{
  			return rutas.map(r => <MapaConRuta  user = {props.user} ruta = {r}></MapaConRuta>)
  			}
  		else{
  			return <h1> Actualmente no tienes rutas en Strava, crea una para comenzar </h1>
  		}
  	}
  	else
  	{
  	 	return <h1> Inicie sesion para importar sus rutas </h1>
  	}
  };

	return (
    <div>
      <h1>Mis rutas Strava</h1>
		  <div className="row">
			 {renderRutas()}
		  </div>
    </div>
		);
}

export default MisRutas;
