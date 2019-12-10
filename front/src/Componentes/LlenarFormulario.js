import React, {useEffect, useState} from 'react';
import MisRutas from "./MisRutas.js";
import Mapa from "./Mapa.js";
import { Component } from "react";
class LlenarFormulario extends Component {


 formatDate() {
    let d = new Date();
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  }

render(){
  return(
    <div>
      <br/>
      <br/>
      <form action = "/crearPaseo" method = "POST">
        <div className="form-group">
          <label >Seleccione la cantidad máxima de personas:</label>
          <input className="form-control" type = "number" name="capacidad" placeholder="Ingrese la capacidad máxima" required/>
        </div>
        <div className="form-group">
          <label htmlFor="productName">Seleccione la fecha de inicio: </label>
          <input
            className="form-control"
            name="fecha"
            type="date"
            min={this.formatDate()}
            ref="finishDate"
            required
          />
        </div>
        <input type="hidden" name="user" value={this.props.user.displayName}/>

        <input type="hidden" name="idRuta" value={this.props.idRuta}/>

        <input type="hidden" name="inscritos" value="[]"/>

        <input type="hidden" name="numInscritas" value="0"/>

        <input className = "btn" type="submit" value="Publicar Ruta"></input>
      </form>
    </div>
    )
  }
}

export default LlenarFormulario;
