import solicitud from "../helpers/solicitud.js";
export const getphotos = async (URL) => {
  // Realiza una solicitud y se le concatena con la ruta que se desea para obtener los datos
    return await solicitud(`${URL}/photos`) // retorna los usuarios obtenidos
    
}