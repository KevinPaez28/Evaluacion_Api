import solicitud from "../helpers/solicitud.js";

export const getCommets = async (URL) => {
  // Llama a la función "solicitud" y se le concatena con la ruta que se desea para obtener los datos
  return  await solicitud(`${URL}/comments`)
}