import solicitud from "../helpers/solicitud.js";
// Función asincrona para obtener las fotos de un álbum específico desde la API
export const getphotosid = async (URL, album) => {
   // Llama a la función "solicitud" pasando la URL con el ID del álbum
  return await solicitud(`${URL}/photos?albumId=${album.id}`)
}