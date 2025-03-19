import solicitud from "../helpers/solicitud.js";
export const getTareas = async (URL) => {
   // Llama a la función "solicitud" y se le concatena con la ruta que se desea para obtener los datos
  return await solicitud(`${URL}/todos`) // retorna los usuarios obtenidos
}