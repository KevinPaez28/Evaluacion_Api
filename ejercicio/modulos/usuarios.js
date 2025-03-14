//importamos la funcion solicitud para obtener los usuarios
import solicitud from "./solicitud.js"; 
//
export  const getUsuarios=async(URL,id)=>{
    let ruta=""; // variable para almacenar la ruta api
  
    ruta = `${URL}/users`; //ruta para obtener todos los usuarios
    
  const usuarios = await solicitud(ruta);
  
    return usuarios; // retorna los usuarios obtenidos

}

