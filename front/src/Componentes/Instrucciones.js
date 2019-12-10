import React from 'react';


const Instrucciones =(props)=>{

  return(
      <div class="text-center">
        <h1>Bienvenidos</h1>
        <p>Nos interesa su seguridad y su salud. Por esto hemos desarrollado la aplicación donde podrá consultar rápidamente el estado actual de la calidad del aire de Bogotá (inicialmente se desarrolló la app para esta ciudad) además de la medición de la calidad de aire más cercana a usted.</p>
        <p>A nosotros los apasionados que montamos bicicleta les recomendamos siempre mirar el estado actual de donde estén y las rutas que tengan planeadas. Así pueden tomar las medidas que consideren necesarias. Si van de paseo o si van al trabajo, siempre es mejor ir acompañado y consciente de las condiciones externas. </p>
        <p>Para utilizar nuestra aplicación simplemente ve a la pestaña de Login e ingresa a tu cuenta de Strava o crea una, es realmente fácil. Cuando hayas realizado este paso mágicamente traeremos las rutas que tengas creadas en Strava. Recuerda que para poder compartir tus rutas con otros debes utilizar la configuración de ruta pública. Todo esto lo podrás observar en la pestaña de Mis Rutas. Si deseas, puedes publicar tu ruta y poner una fecha de salida, así como un cupo máximo del grupo. Si deseas más bien buscar rutas de otras personas o armar un parche con tus amigos ingresa a la pestaña de Buscar rutas. En esta podrás encontrar todas las rutas publicadas y podrás inscribirte a una ruta. Además, podrás observar las condiciones de aire de cada una de las rutas.  </p>
        <p>Recuerda siempre verificar las condiciones de tu entorno antes de salir (las generales y las más cercanas a ti). Recuerda siempre llevar casco y viaja con precaución.</p>
        <p>La idea es que siempre puedas visualizar la calidad del aire en cualquier ruta de la siguente manera </p>
        <img src="https://raw.githubusercontent.com/lmaya10/RutasBici/master/Imagenes/Ruta%20circular.PNG" alt="Ejemplo mapa con ruta"/>
        <h1>Feliz día Rutas Bici</h1>
      </div>
    )
}
export default Instrucciones;