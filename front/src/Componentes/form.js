import React, { Component } from "react";

class Form extends Component{

  constructor(props) {
    super(props);
  }

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
      <h1 className = "tituloForm"> Ingrese la información de su nuevo paseo </h1>
      <br/>
      <br/>
      <form action = "/crearPaseo" method = "POST">
        <div className="form-group">
          <label for="nombre" >Ingrese el nombre del paseo:</label>
          <input className="form-control" type="text" name="nombre"  placeholder=" Ingrese nombre"/>
        </div>
        <div className="form-group">
          <label >Ingrese un punto de encuentro:</label>
          <input className="form-control" type="text" name="puntoEncuentro"  placeholder=" Ingrese punto de encuentro"/>
        </div>
        <div className="form-group">
          <label >Ingrese la descripción de la ruta:</label>
          <input className="form-control"  type="text" name="ruta" placeholder=" Ingrese descripción de ruta"/>
        </div>
        <div className="form-group">
          <label >Seleccione la cantidad máxima de personas:</label>
          <input className="form-control" type = "number" name="capacidad" placeholder="Ingrese la capacidad máxima"/>
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
        <input type="hidden" name="user" value={this.props.usuario}/>

        <input type="hidden" name="numInscritas" value="0"/>

        <input className = "btn" type="submit" value="Enviar"></input>
      </form>
    </div>
    )
  }
}
export default Form;