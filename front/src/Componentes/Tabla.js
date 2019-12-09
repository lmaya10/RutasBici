import React from 'react';
import  './Tabla.css'

const Tabla =()=>{

  return(
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ICA</th>
            <th scope="col">Calidad del Aire</th>
            <th scope="col">Proteja su salud</th>
          </tr>
        </thead>
        <tbody>
          <tr className="uno">
            <td>0-50</td>
            <td>Buena</td>
            <td>No se anticipan impactos a la salud cuando la calidad del aire se encuentra en este intervalo.</td>
          </tr>
          <tr className="dos">
            <td>51-100</td>
            <td>Moderada</td>
            <td>Las personas extraordinariamente sensitivas deben considerar limitación de los esfuerzos físicos excesivos y prolongados al aire libre.</td>
          </tr>
          <tr className="tres">
            <td>101-150</td>
            <td>Dañina a la Salud de los Grupos Sensitivos</td>
            <td>Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos físicos excesivos y prolongados al aire libre.</td>
          </tr>
          <tr className="cuatro">
            <td>151-200</td>
            <td>Dañina a la Salud</td>
            <td>Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos excesivos prolongados al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos y prolongados al aire libre.</td>
          </tr>
          <tr className="cinco">
            <td>201-300</td>
            <td>Muy Dañina a la Salud</td>
            <td>Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar todos los esfuerzos excesivos al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos al aire libre.</td>
          </tr>
          <tr className="seis">
            <td>300+</td>
            <td>Arriesgado</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>
    )
}
export default Tabla;