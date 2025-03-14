import solicitud from "./solicitud.js";
// Función asincrona para obtener los comentarios de un post específico desde la API
export const getCommets = async (URL, post) => {
  // Llama a la función "solicitud" pasando la URL con el ID del post
  return  await solicitud(`${URL}/comments?postId=${post.id}`)
}