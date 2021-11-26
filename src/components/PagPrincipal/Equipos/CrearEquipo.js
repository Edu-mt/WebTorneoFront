import React, { useState, useEffect } from "react";
import {addEquipos, addNoticia} from "../../../services/user";
import PropTypes from 'prop-types';
import "./Equipos.css";

function CrearEquipo() {
//   const dispatch = useDispatch(); 
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [logo, setLogo] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [listaJugadores, setListaJugadores] = useState("");
  const [fr, setFr] = useState(new FileReader());
  const [myFileField, setMyFileField] = useState(React.createRef())



  
  function traerImagen() {
    const image = fr.result;
    actualizarFoto(image);
  }

 function actualizarFoto(logo) {
  setLogo({ logo: logo });
  }

  function actualizarImagen(ev) {
    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];
      fr.addEventListener('load', traerImagen);
      fr.readAsDataURL(myFile);
    }
  }
  console.log("FOTO DE CREAREQUIPO", logo);

  const enviarDatosEquipos = async() => {
    const data = {
      nombreEquipo: nombreEquipo,
      logo: logo.logo,
      color1:color1,
      color2:color2,
      listaJugadores:[],
    };
    console.log("enviarDatosEquipos", data); 
  const res =await addEquipos(data);
  const respuesta = addNoticia("Se ha creado un nuevo equipo: "+ data.nombreEquipo); 
 

  reset();
  };

 const reset=()=>{
    setNombreEquipo("");
 } 

  return (
    <div className="CajaCrearEquipo">
      
      <div className="crearColum">
      <input
        className="NombreEquipo"
        type="text"
        value={nombreEquipo}
        placeholder="Nombre de Equipo"
        name="nombreEquipo"
        onChange={(e) => setNombreEquipo(e.target.value)}
      />
       <br/>
       <p>Asignar color1</p>
       <input
        className="Color"
        type="color"
        // value="#ff0000"
        placeholder="Color de equipo 1"
        name="color1"
        onChange={(e) => setColor1(e.target.value)}
       />
        <br/>
        <p>Asignar color2</p>
      <input
        className="Color"
        type="color"
        // value="#ff0000"
        placeholder="Color de Equipo 2"
        name="color2"
        onChange={(e) => setColor2(e.target.value)}
        
      /> 
       <br/><br/>
       {/* <button type="submit" className="btn btn-dark" onClick={()=>submit()}>Save</button> este es el submit bueno del profesor */}
      <button onClick={enviarDatosEquipos} className="btnCrearEquipo">Crear Equipo</button>
      </div>
      <div className="cajaAñadirLogoEquipo">
      <label className="añadirLogo" type="button">
         <p>Añadir logo de equipo</p>
          <input
           className="imputLogoEquipo"
            type="file"
            ref={myFileField}          
            onChange={actualizarImagen}
          />
        </label>
        <div className="logoEquipo" style={{ backgroundImage: `url(${logo.logo})`}}></div>
        </div>
        <button onClick={enviarDatosEquipos} className="btnResponsiveCrearEquipo">Crear Equipo</button>
      </div>
  );
}

export default CrearEquipo;
