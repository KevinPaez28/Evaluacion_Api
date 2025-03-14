//importamos las funciones que necesitamos
import { getUsuarios, getPost, getCommets, getalbumes, getphotos } from "./modulos/index.js"; 
const URL = "https://jsonplaceholder.typicode.com"; // En una variable String asignamos el link del api
const usuarioId=5; // ID del usuario a consular
// funcion asincrona para obtener informacion de las api
const getusuarioId= async (usuarioId)=>{ 
    let usuario= await getUsuarios(URL,usuarioId); //obtiene los datos del usuario
  let post = await getPost(URL, usuario) // obtiene los datos de los post
  let albumes = await getalbumes(URL, usuario) // obtiene los datos de los albumes
  }

getusuarioId(usuarioId); // llamamos a la fgncion con el usuario definido

// funcion asincrona que obtiene los post, comentarios y albumes de los usuarios
const manejardatos = async () => { 
  const usuarios = await getUsuarios(URL); //obtiene la lista de usuarios
  
  //usamos un promise.all para saber que todas las promesas estan resueltas al igual utilizamos un .map para recorrer los usuarios 
  return await Promise.all(usuarios.map(async (usuario) => { 
     // obtiene los post de los usuarios con su respectivo id 
    const posts = await getPost(URL, usuario);

    // obtiene los comentarios de los post y los asocia su id de usuario      
    const comentPost = await Promise.all(posts.map(async (post) => {
          
      const coments = await getCommets(URL, post);
      //nos retorna un objeto que contiene los post respectivos con su id  pero agregando una nueva clave "coments", cuyo valor es la lista de comentarios obtenidos
      return { ...post, coments };
      
    }));
    // obtiene los albumes de los usuarios asociados con su id
    const albumes = await getalbumes(URL, usuario);

    //obtiene las fotos de los albumes asociados a su album id
    const photos = await Promise.all(albumes.map(async (album) => {
      //obtiene las fotos del los albumes    
      const fotos = await getphotos(URL, album);
    // Retorna un nuevo objeto que mantiene todas las propiedades del álbum original
    // pero agregando una nueva clave "fotos", cuyo valor es la lista de fotos obtenida.
      return{ ...album, fotos}
      
    }));
    // Retorna un nuevo objeto que mantiene todas las propiedades del usuario original
    // pero agregando los posts con comentarios y los álbumes con fotos
     return { ...usuario, comentPost, albumes:photos };
    
  }));
  

};
// Llamamos a la función manejardatos(), que devuelve una promesa
manejardatos().then((data) => {
      // Cuando la promesa se resuelve, "data" contiene la información procesada
    console.log(data);//muestra datos en consola 
});

