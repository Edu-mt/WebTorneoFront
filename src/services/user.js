import axios from "axios";


const addUser =async (data) => {
  let respuestaServidor;
 await axios({
    method: "post",
    url: "http://127.0.0.1:8081/altaUsuario",
    data: {
      nombre: data.nombre,
      password: data.password,
      email: data.email,
      idEquipo: data.idEquipo,
      nombreEquipo: data.nombreEquipo,
      avatar: data.avatar
    },
  })
    .then(function (response, err) {
      console.log(err);
     
      
      if (response.data.stateFind === true ) {
        console.log(response.data)
        alert("el usuario ya existe");
         respuestaServidor = response.data;
      } else if(response.data.stateFind === false) {
        console.log("el usuario ha sido insertado")
        console.log(response.data)
        respuestaServidor = response.data;
        
      }
    })
    .catch(function (err) {
      console.log(err);
    });

    return respuestaServidor;
};



const getUser =async (nombre, password) => {
  console.log("getUser cookies", nombre, password)
  let respuestaServidorLoggin;
  await axios.get("http://127.0.0.1:8081/getLoggin", {
    params: {
      nombre: nombre,
      password: password,
    },
  })
  .then(function (response, err) {
    console.log(err);
    console.log("este es response",response)
   
    
    if (response.data.stateFindGet === false ) {
      console.log("false",response.data)
      alert("El usuario o la contraseña no son validos");
      respuestaServidorLoggin=response.data;
    } else if(response.data.stateFindGet === true) {
      console.log("el usuario ha sido encontado")
      console.log("true",response.data)
      respuestaServidorLoggin=response.data;
    }
  })
  .catch(function (err) {
    console.log(err);
  });

  return respuestaServidorLoggin;
};


const addEquipos =async (data) => {
 await axios({
    method: "post",
    url: "http://127.0.0.1:8081/CrearEquipo",
    data: {
      nombreEquipo: data.nombreEquipo,
      listaJugadores: data.listaJugadores,
      logo:data.logo,
      color1:data.color1,
      color2:data.color2,
     
    },
    
  });console.log("console addEquipos",data)
 
};


const traerEquipos =async () => {
  let respuestaServidorEquipo;
 await axios({
    method: "post",
    url: "http://127.0.0.1:8081/traerEquipo",    
  })
    .then(function (response, err) {
      console.log(err);
      console.log("esto es response addEquipo" , response)
      console.log("esto es response.data addEquipo" ,response.data)
      respuestaServidorEquipo = response.data;   
    })
    .catch(function (err) {
      console.log(err);
    });

    return respuestaServidorEquipo;
};

const addJugador =async (data) => {
 
 await axios({
    method: "post",
    url: "http://127.0.0.1:8081/unirseEquipo",    
    data: {
      nombreEquipo: data.nombreEquipo,
      nombreUsuario: data.usuario,
      cambiarEquipo: ""
    }
  })
   
  .then(function (response, err) {
    console.log(err);   
    
    if (response.data.stateFindEquipo === true ) {
      // alert("Quieres abandonar tu equipo actual?");
      var confirmacion = window.confirm("Estas seguro que quieres cambiar de equipo?");
      if (confirmacion === true){        
         axios({
          method: "post",
          url: "http://127.0.0.1:8081/unirseEquipo",
          
          data: {
            nombreEquipo: data.nombreEquipo,
            nombreUsuario: data.usuario,
            cambiarEquipo: true            
          }
        });
      }
      console.log("despues de confirmacion" , response.data) 
    } 
  })
    .catch(function (err) {
      console.log(err);
    });

   
};

const subirImagen =(data)=>{
axios.post( "http://127.0.0.1:8081/subirImagen", data, { 
  headers: {
    'Content-Type': 'multipart/form-data'
  }// receive two parameter endpoint url ,form data 
})
.then(res => { // then print response status
    console.warn(res);
});console.log("axios subir imagen",data);

}
// Este es el bueno del profesor

//Enviar el torneo creado al servidor
const addTorneo=async (data) => {
  await axios({
     method: "post",
     url: "http://127.0.0.1:8081/GenerarTorneo",
     data: {
       nombreTorneo: data.nombreTorneo,
       arrayPartidas: data.arrayPartidas
     },
     
   });console.log("console addTorneo",data)  
 };


const traerTorneo =async () => {
  let axiosTorneos
await axios.get("http://127.0.0.1:8081/traerTorneo")
      .then((response) => {
        console.log("TORNEOS TRAIDOS DEL SERVER", response.data);
        axiosTorneos = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
      return axiosTorneos;
  };

  const addGanador=async (data) => {
    console.log("----- SEGUNDO ENVIANDO AXIOS ADD GANADOR AL SERVIDOR-------",data)
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/enviarGanador",
       data: {
        resultados: data.resultados[0],
        indice: data.indice,
       },
     }) 
    
     .then(function (response, err) {
      console.log(err);     
      
      if (response.data.stateisFindEnviarGanador === true ) {
        // console.log("prueba del true addganador", response.data);
        alert("Ya existe un ganador en esta partida");
      } 
    })
    .catch(function (err) {
      console.log(err);
    });
   };

  
   
  const changeGanador=async (data) => {
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/cambiarGanador",
       data: {
        resultados: data.resultados[0],
        indice: data.indice,
       },
     });console.log("-----ENVIANDO AXIOS ADD GANADOR-------",data)
    
   };

   const addFoto =async (data) => {
 
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/enviarAvatar",    
       data: {
         avatar: data.foto,
         nombreUsuario: data.usuario,
         foto: ""         
       }       
     })     
     .then(function (response, err) {
      console.log(err);     
      
      if (response.data.stateFindChangePhoto === true ) {
        window.location.reload();
      } 
    })
       .catch(function (err) {
         console.log(err);
       });console.log("AXIOS FOTAVATAR",data.avatar);      
   };


   const deleteTorneo=async (data) => {
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/EliminarTorneo",
       data: {
         nombreTorneo: data.nombreTorneo,
       },       
     });console.log("console deleteTorneo en el post",data)  
   };

   const addJornada=async (data) => {
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/ganadoresJornada",
       data: {
        arrayGanadoresJornada: data,
       },
     });console.log("-----ENVIANDO AXIOS  GANADORES JORNADA -------", data)    
   };

   const addNoticia =async (data) => {
     console.log("PASA NOTICIA AXIOS", data)
    await axios({
       method: "post",
       url: "http://127.0.0.1:8081/crearNoticias",
       data: {
        texto : data
       },
       
     })
   };
   const traerNoticias =async () => {
    let respuestaServidorNoticias;
   await axios({
      method: "post",
      url: "http://127.0.0.1:8081/traerNoticias",    
    })
      .then(function (response, err) {
        console.log(err);
        respuestaServidorNoticias = response.data;   
      })
      .catch(function (err) {
        console.log(err);
      });
  
      return respuestaServidorNoticias;
  };

export { addUser, getUser, addEquipos,traerEquipos,addJugador , subirImagen, addTorneo, traerTorneo, 
  addGanador , changeGanador, addFoto , deleteTorneo, addJornada, addNoticia, traerNoticias };
