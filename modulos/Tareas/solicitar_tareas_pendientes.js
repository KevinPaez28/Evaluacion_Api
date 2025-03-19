import solicitud from "../helpers/solicitud.js";
export const getTareaspendientes = async (URL, usuario) => {
   // Llama a la función "solicitud" pasando la URL con el ID
  return await solicitud(`${URL}/todos?userId=${usuario.id}`)
}

 