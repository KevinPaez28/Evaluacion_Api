import solicitud from "../helpers/solicitud.js";
// Función asincrona para obtener los álbumes de un usuario específico desde la API
export const getalbumesid = async (URL, usuario) => {
   // Llama a la función "solicitud" pasando la URL con el ID del usuario
  return await solicitud(`${URL}/albums?userId=${usuario.id}`)
}