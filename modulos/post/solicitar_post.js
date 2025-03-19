import solicitud from "../helpers/solicitud.js";
export const getPostarray = async (URL) => {
  // Realiza una solicitud y se le concatena con la ruta que se desea para obtener los datos
    return await solicitud(`${URL}/posts`) // retorna los usuarios obtenidos
    
}