import solicitud from "./solicitud.js";
export const getTareas = async (URL, usuario) => {
   // Llama a la función "solicitud" pasando la URL con el ID
  return await solicitud(`${URL}/todos?userId=${usuario.id}`)
}