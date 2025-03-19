import { getphotos, getUsuarios , getalbumes } from "../ejercicio/modulos/index.js";


const URL = "https://jsonplaceholder.typicode.com";
const nombreUsuario=prompt("Ingrese el usuario que desea buscar")




const albumesUsu = async () => {

  const usuario = await getUsuarios(URL);// nos retorna la informacion de los usuarios
  
  //filtramos la informacion de los usuarios, en la llave name y que nos retorne un objeto cuando los elementos sean iguales a la varible nombreUsuario
  const filtrado = usuario.filter(nombreusu =>  nombreusu.name == nombreUsuario)
  
  //recorremos los datos filtramos y usamos un promise.all para epserar a que toda las promesas se realicen al igual recorremos el archivo json con el .map
  return await Promise.all(filtrado.map(async (usuarios) => {
    
    const albumes = await getalbumes(URL, usuarios);
    
    //obtiene las fotos de los albumes asociados a su album id
    const photos = await Promise.all(albumes.map(async (album) => {
      //obtiene las fotos del los albumes    
      const fotos = await getphotos(URL, album);
      // Retorna un nuevo objeto que mantiene todas las propiedades del álbum original
      // pero agregando una nueva clave "fotos", cuyo valor es la lista de fotos obtenida.
      return { ...album, fotos }
          
    }));
    // Retorna un nuevo objeto que mantiene todas las propiedades del usuario original
    // pero agregando los posts con comentarios y los álbumes con fotos
    return { ...usuarios, albumes:photos};
  }));

}
//llamamos a la funcion Tareaspendientes, que nos devuelve una promesa
albumesUsu().then((data) => {
  console.log(data)
});