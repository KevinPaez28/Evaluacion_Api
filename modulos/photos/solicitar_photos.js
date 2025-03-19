import solicitud from "../helpers/solicitud.js";
export const getphotos = async (URL) => {
  // Realiza una solicitud a la API para obtener los posts del usuario según su ID
    return await solicitud(`${URL}/photos`) 
    
}