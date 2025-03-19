import solicitud from "../helpers/solicitud.js";
export const getTareas = async (URL) => {
   // Llama a la función "solicitud" pasando la URL con el ID
  return await solicitud(`${URL}/todos`)
}