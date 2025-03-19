//funcion asincrona para hacer solicitud a una api y obtener archivos json
const solicitud = async url => {
  //realizar la peticion a la URL proporcionada utilizando fetch
  const peticion = await fetch(url);
  //convertimos la variable peticion en formato json
  const data = await peticion.json();
  // retorna los datos obtenidos
    return data
}
//exportamos la funcion por defecto 
export default solicitud 
