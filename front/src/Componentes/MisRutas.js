import React, {useEffect, useState} from 'react';

function MisRutas(props) {

	const [rutas, setRutas] = useState([]);

	useEffect(() => {

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
      console.log("RutasUser", rutasUser);
    });
  }, []); // Run only once

	return (
		<div>
		</div>
		);
}

export default MisRutas;
