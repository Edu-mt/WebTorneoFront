import { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
// import Equipos from "../Equipos";
import {addEquipos,subirImagen} from "../../../services/user";
import "./Equipos.css";

function CrearEquipo() {
//   const dispatch = useDispatch(); 
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [logo, setLogo] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [listaJugadores, setListaJugadores] = useState("");


 const handleInputChange=(event)=>{
setLogo(event.target.files[0])
  }
  // Este es el bueno del profesor

  const submit=()=>{
    const data=new FormData();
    // data.append("image",logo);
    // subirImagen(data);
    console.log("data del submit",data);
    console.log("este es el logo" , logo)
  }
  // Este es el bueno del profesor


  const enviarDatosEquipos = async() => {
    const data = {
      nombreEquipo: nombreEquipo,
      // logo:logo,
      color1:color1,
      color2:color2,
      listaJugadores:[],
    };
    console.log("enviarDatosEquipos", data); 
  const res =await addEquipos(data);
//   console.log("este es el console log del res en altaUsuario",res);
//   if(res.stateFind === false){
//     dispatch(addDataUser(res.data));
//   }  

  reset();
  };

 const reset=()=>{
    setNombreEquipo("");
 } 

  return (
    <div className="App">
      {/* <form method="" action=""> */}
      <input
        type="text"
        value={nombreEquipo}
        placeholder="Nombre de Equipo"
        name="nombreEquipo"
        onChange={(e) => setNombreEquipo(e.target.value)}
      />
      <br/>
      {/* <form action="/uploadfile" enctype="multipart/form-data" method="POST"> 
        <input type="file" name="myFiles" />
        <input type="submit" value="Upload a file"/>
      </form>          

      <input type="file" className="form-control" name="image" onChange={handleInputChange} /> este es el input bueno del profesor
       */}
       <br/>
       <input
        type="color"
        // value="#ff0000"
        placeholder="Color de equipo 1"
        name="color1"
        onChange={(e) => setColor1(e.target.value)}
       />
        <br/>
      <input
        type="color"
        // value="#ff0000"
        placeholder="Color de Equipo 2"
        name="color2"
        onChange={(e) => setColor2(e.target.value)}
      /> 
       <br/>
       {/* <button type="submit" className="btn btn-dark" onClick={()=>submit()}>Save</button> este es el submit bueno del profesor */}
      <button onClick={enviarDatosEquipos}>Crear Equipo</button>
    </div>
  );
}

export default CrearEquipo;
