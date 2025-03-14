//importamos la funcion solicitud desde el archivo solicitud.js
import solicitud from "./solicitud.js";
//funcion asincrona para obtener los post de un usuario especifico desde la api
export const getPost = async (URL, usuario) => {
  // Realiza una solicitud a la API para obtener los posts del usuario según su ID
    return  await  solicitud(`${URL}/posts?userId=${usuario.id}`) 
    
}