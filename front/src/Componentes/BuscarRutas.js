import React, {useEffect, useState} from 'react';
function BuscarRutas(props) {
  const [paseos, setPaseos] = useState([]);
  const [err, setErr] = useState("");

	useEffect(() => {
		fetch("paseos")
      .then(res => res.json())
      .then( data => {
        if(data.err) {
          setErr(JSON.stringify(data.msg));
        }
        else{
          setPaseos(data);
        }
      });
	}, [])


  const renderPaseos = () => paseos.map(d => 
  	<div>
			<h1>{d.nombre}</h1>
			<br/>
  	</div>
  )
	
  return(
      <div>
        <div >
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
