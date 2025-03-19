import solicitud from "../helpers/solicitud.js";
// Función asincrona para obtener los álbumes de un usuario específico desde la API
export const getalbumes = async (URL) => {
   // Llama a la función "solicitud" y se le concatena con la ruta que se desea para obtener los datos
  return await solicitud(`${URL}/albums`)// retorna los usuarios obtenidos
}