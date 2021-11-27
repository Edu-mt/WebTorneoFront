import React from 'react';
import "./header.css";
import {  useSelector, useDispatch  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";
import { loggin } from "../../../features/userSlice";



export default function HeaderPagPrincipal() {
  const dispatch = useDispatch();
  const datosUsuario = useSelector(selectDataUser);
  const cerrarSesion = ()=>{
    if(loggin(true)){
      document.cookie = "nombre=; max-age=0; path=/";
      document.cookie = "password=; max-age=0; path=/";  
      dispatch(loggin(false));
      window.location.reload();
    }
  }
    
    return (
    <>
    <div className="buscadorPrincipal"> 
    <div className="cajaCerrarSesionResponsive">
    <div className="tituloCerrarSesionResponsive">cerrar sesion</div>
    <div className="iconoCerrarSesionResponsive" onClick={cerrarSesion}></div>
    </div>
      <div className="cajaLogo">
        <div className="logo"></div>
        </div>
          <div>
          <div className="Titulo"></div>
        </div>
          <div className="ZonaUsuario">
          <div className="Usuario"><p>{datosUsuario.nombre}</p></div> 
          <div className="fotoPerfilHeader" style={{ backgroundImage: `url(${datosUsuario.avatar})`}}></div>        
          <button className="btnCerrarSesion" onClick={cerrarSesion}>cerrar sesion</button>      
        </div>
        
    </div>
       
    </>
    )
}
