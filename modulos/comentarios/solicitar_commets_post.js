import solicitud from "../helpers/solicitud.js";
// Función asincrona para obtener los comentarios de un post específico desde la API
export const getCommetsid = async (URL, post) => {
  // Llama a la función "solicitud" pasando la URL con el ID del post
  return  await solicitud(`${URL}/comments?postId=${post.id}`)
}