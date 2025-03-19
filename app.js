import { getUsuarios } from "./modulos/Usuarios/solicitar_usuarios.js";
import { getTareaspendientes, getTareas } from "./modulos/Tareas/index.js";
import { getPost,getPostarray } from "./modulos/post/index.js";
import { getphotosid,getphotos } from "./modulos/photos/index.js";
import { getCommets,getCommetsid} from "./modulos/comentarios/index.js";
import { getalbumes, getalbumesid } from "./modulos/albums/index.js"
let Ingreso;
const intervalo = setInterval(() => { 
  Ingreso = prompt(`¿Que ejercicio desea ejecutar?
    1. Mostrar tareas
    2. Mostrar álbumes
    3. Mostrar post
    4. Mostrar usuarios con teléfono
    5. Obtener datos de usuario con ID 
    0. Salir`)
  if (Ingreso === "0") {
    clearInterval(intervalo); // Detiene la ejecución si el usuario ingresa "0"
    console.log("Programa terminado."); //imprime en consola
    return;
  } 
  if (Ingreso == "1") {
    let mostrarusuarios = prompt(`Que informacion desea traer
     1. Todas las tareas
     2. Usuarios con tareas pendientes
      (Ingrese el número correspondiente)`)
    if (mostrarusuarios == "1") {
     const URL = "https://jsonplaceholder.typicode.com";
    let usuario = getTareas(URL);//obtenemos los datos de los usuarios
    //Funcion asincriona para obtener la informacion de la api
    const TareasPendientes = async () => {
    
      const usuarios = await getTareas(URL); // nos retorna la informacion de los usuarios
     
      //Usamos un promise.all para esperar a que todas las promesas se realicen al igual recoremos el archivo json con el .mapy y este nos retorna un objeto
      return await Promise.all(usuarios.map(async (usuarios) => {
        //obtiene las tareas pendiente de los usuarios y los asocia con su id
       
        return{...usuarios}
      }))
    }
    //llamamos a la funcion Tareaspendientes, que nos devuelve una promesa
      TareasPendientes().then((data) => {
      console.log("Imprime todas las tareas")
      console.log(data)//muestra datos en la consola
    })
    }else if (mostrarusuarios == "2") {
    const URL = "https://jsonplaceholder.typicode.com";
    let usuario = getUsuarios(URL);//obtenemos los datos de los usuarios
   
    //Funcion asincriona para obtener la informacion de la api
    const TareasPendientes = async () => {
    
      const usuarios = await getUsuarios(URL); // nos retorna la informacion de los usuarios
     
      //Usamos un promise.all para esperar a que todas las promesas se realicen al igual recoremos el archivo json con el .mapy y este nos retorna un objeto
      return await Promise.all(usuarios.map(async (usuarios) => {
        //obtiene las tareas pendiente de los usuarios y los asocia con su id
        const tareaspendi = await getTareaspendientes(URL, usuarios)
        //filtramos la informacon con .filter en la llave completed y que nos de retorne un objeto cuando los elementos de la llave sean false
        const filtrado = tareaspendi.filter(pendiente => pendiente.completed == false)
        //retornamos un objeto que contiene a los usuarios con su respectivos id, pero al igual nos retorna las tareas que estan en pendiente
        return{...usuarios,filtrado}
      }))
    }
    //llamamos a la funcion Tareaspendientes, que nos devuelve una promesa
      TareasPendientes().then((data) => {
      console.log("Usuarios con Tareas pendientes")
      console.log(data)//muestra datos en la consola
    })
    }else {
       alert("Opción inválida en menu. Volviendo al menu principal");
    } 
  }
  else if (Ingreso == "2") {
    let mostraralbumes = prompt(`Que informacion desea traer
     1. Todas los albumes 
     2. Albumes filtrando el nombre del usuario
     (Ingrese el número correspondiente)`)
    if (mostraralbumes == "1") {
      const URL = "https://jsonplaceholder.typicode.com";
    // Función asíncrona que obtiene los álbumes desde la API
    const albumesUsu = async () => {
       const albumes = await getalbumes(URL);// Llamamos a la función getalbumes para obtener los álbumes
      
       return { ...albumes}; //retorna la lista de albumes
   }
   //llamamos a la funcion Tareaspendientes, que nos devuelve una promesa
      albumesUsu().then((data) => {
     console.log("Imprimimos todos los albumes") //mensaje que imprime en consola
     console.log(data) // resultaods de albumes por consola
   });
      
    }
    else if (mostraralbumes == "2") {
      const URL = "https://jsonplaceholder.typicode.com";
      const nombreUsuario=prompt("Ingrese el usuario que desea buscar")
        const albumesUsu = async () => {
      
        const usuario = await getUsuarios(URL);// nos retorna la informacion de los usuarios
        
        //filtramos la informacion de los usuarios, en la llave name y que nos retorne un objeto cuando los elementos sean iguales a la varible nombreUsuario
        const filtrado = usuario.filter(nombreusu =>  nombreusu.name == nombreUsuario)
        
        //recorremos los datos filtramos y usamos un promise.all para epserar a que toda las promesas se realicen al igual recorremos el archivo json con el .map
        return await Promise.all(filtrado.map(async (usuarios) => {
          
          const albumes = await getalbumesid(URL, usuarios);
          
          //obtiene las fotos de los albumes asociados a su album id
          const photos = await Promise.all(albumes.map(async (album) => {
            //obtiene las fotos del los albumes    
            const fotos = await getphotosid(URL, album);
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
        console.log("Albumes filtrando el nombre del usuario")
        console.log(data)
      });
   }else {
        alert("Opción inválida en menu. Volviendo al menu principal");
    }
  }
  else if (Ingreso == "3") {
    let mostrarPost = prompt(`Que informacion desea traer
     1. Todos los Post
     2. Post filtrando el nombre del post
      (Ingrese el número correspondiente)`)
    if (mostrarPost == "1") {

      const URL = "https://jsonplaceholder.typicode.com";
      // Función asíncrona para obtener los posts desde la API
      const Post = async () => {
     
        const post = await getPostarray(URL);// Llamamos a la función getPostarray para obtener los posts
         // Usamos Promise.all para manejar saber que todas las promesas se retornen
        return await Promise.all(post.map(async (post) => {
            return { ...post }
        }))
      }
     // Llamamos a la función Post y manejamos la promesa
    Post().then((data) => {
      console.log("Todos los Post"); // Mensaje indicativo en consola
      console.log(data); // Mostramos los posts en consola
    });
    }
    else if (mostrarPost == "2") {
      const URL = "https://jsonplaceholder.typicode.com";
      const comen = prompt("Ingrese que comentario desea buscar");
      const busqueda = new RegExp(comen)
      const Post = async () => {
       
        const post = await getPostarray(URL);
  
        const filtrado = post.filter((post) => busqueda.test(post.title))
       
        return await Promise.all(filtrado.map(async (post) => {
          const comments = await getCommets(URL, post);
  
          return { ...post, comments }
        }))
  
      }
      Post().then((data) => {
        console.log("Posts filtrando el nombre del post")
        console.log(data)
      })
    }else {
       alert("Opción inválida en menu. Volviendo al menu principal");
    } 
  } 
  else if (Ingreso == "4") {
    const obtenerInfo = async () => {
      const URL = "https://jsonplaceholder.typicode.com";
  
      const usuario = await getUsuarios(URL);//Llamamos a la función getUsuarios para traer los usuarios

     // Recorremos la lista de usuarios y extraemos su nombre y teléfono
      return await Promise.all(usuario.map(async (user) => {
        return {
         usuario: user.name, // Guardamos el nombre del usuario
         phone: user.phone   // Guardamos el número de teléfono
        }
      }))
    }
    obtenerInfo().then((resultado) => {
     console.log("Imprimimos Usuario y su número de teléfono"); // Mensaje en consola
    console.log(resultado); // Mostramos la lista de usuarios con su número
    })
  }
  else if (Ingreso == "5") {
    const URL = "https://jsonplaceholder.typicode.com"; // En una variable String asignamos el link del api
    const usuarioId=5; // ID del usuario a consular
    // funcion asincrona para obtener informacion de las api
    const getusuarioId= async (usuarioId)=>{ 
        let usuario= await getUsuarios(URL,usuarioId); //obtiene los datos del usuario
      let post = await getPost(URL, usuario) // obtiene los datos de los post
      let albumes = await getalbumesid(URL, usuario) // obtiene los datos de los albumes
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
              
          const coments = await getCommetsid(URL, post);
          //nos retorna un objeto que contiene los post respectivos con su id  pero agregando una nueva clave "coments", cuyo valor es la lista de comentarios obtenidos
          return { ...post, coments };
          
        }));
        // obtiene los albumes de los usuarios asociados con su id
        const albumes = await getalbumesid(URL, usuario);
    
        //obtiene las fotos de los albumes asociados a su album id
        const photos = await Promise.all(albumes.map(async (album) => {
          //obtiene las fotos del los albumes    
          const fotos = await getphotosid(URL, album);
        // Retorna un nuevo objeto que mantiene todas las propiedades del álbum original
        // pero agregando una nueva clave "fotos", cuyo valor es la lista de fotos obtenida.
          return{ ...album, fotos}
          
        }));
        // Retorna un nuevo objeto que mantiene todas las propiedades del usuario original
        // pero agregando los posts con comentarios y los álbumes con fotos
         return { ...usuario, comentPost, albumes:photos };
        
      }));
      
    
    };
    // Llamamos a la función manejardatos, que devuelve una promesa
    manejardatos().then((data) => {
          // Cuando la promesa se resuelve, "data" contiene la información procesada
        console.log("imprimimos los usuarios con su post, comentarios y albumes");//muestra datos en consola 
        console.log(data);//muestra datos en consola 
    });
  }else {
    alert("Opción no válida. Inténtelo de nuevo.");
}
  
}, 5000);

