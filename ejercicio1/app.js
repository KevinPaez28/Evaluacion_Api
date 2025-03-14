//importamos las funciones que necesitamos//
import { getUsuarios, getTareas } from ".././ejercicio/modulos/index.js";
const URL = "https://jsonplaceholder.typicode.com";

let usuario = getUsuarios(URL);//obtenemos los datos de los usuarios
let Tareas = getTareas(URL, usuario); //obtenemos los datos de las tareas
 
//Funcion asincriona para obtener la informacion de la api
const TareasPendientes = async () => {

  const usuarios = await getUsuarios(URL); // nos retorna la informacion de los usuarios
 
  //Usamos un promise.all para esperar a que todas las promesas se realicen al igual recoremos el archivo json con el .mapy y este nos retorna un objeto
  return await Promise.all(usuarios.map(async (usuarios) => {
    //obtiene las tareas pendiente de los usuarios y los asocia con su id
    const tareaspendi = await getTareas(URL, usuarios)
    //filtramos la informacon con .filter en la llave completed y que nos de retorne un objeto cuando los elementos de la llave sean false
    const filtrado = tareaspendi.filter(pendiente => pendiente.completed == false)
    //retornamos un objeto que contiene a los usuarios con su respectivos id, pero al igual nos retorna las tareas que estan en pendiente
    return{...usuarios,filtrado}
  }))

}
//llamamos a la funcion Tareaspendientes, que nos devuelve una promesa
TareasPendientes().then((data) => {
  console.log(data)//muestra datos en la consola
})