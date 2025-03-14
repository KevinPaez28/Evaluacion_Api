//importamos la funcion solicitud para obtener los usuarios
import solicitud from "./solicitud.js"; 
//
export  const getUsuarios=async(URL,id)=>{
    let ruta=""; // variable para almacenar la ruta api
  // if (id) {
  //   ruta = `${URL}/users?id=${id}`;
  // } else {
    ruta = `${URL}/users`; //ruta para obtener todos los usuarios
    
  // }
  // realiza la solicitud a la api ocn la ruta construida
  const usuarios = await solicitud(ruta);
  
    return usuarios; // retorna los usuarios obtenidos

}