import { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import { loggin, addDataUser } from "../../features/userSlice";
import {getUser} from "../../services/user";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "../../App.css"
import "./logginYRegistro.css";

// import axios from "axios";


//cuando 

function Loggin () { 

  const [nombre, setNombre] = useState(''); 
  const [password, setPassword] = useState(''); 
  const dispatch = useDispatch();
  
  const setCookie = (cname, cvalue, exdays) => { 
    const d = new Date(); 
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); 
    let expires = "expires=" + d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
    console.log("cookies",document.cookie);
  } 

const realizarLogin = async() => { 
    if (nombre === ""){
        alert("Ingresar Nombre");
    }
    else if(password === ""){
        alert("Ingresar password");
    }

     else{
      const response = await getUser(nombre,password);
      console.log("console log del response en Loggin",response);
      if(response.stateFindGet === true){   
        setCookie("nombre", nombre, 10); 
        setCookie("password", password, 10);
        dispatch(loggin(true));
        dispatch(addDataUser(response.data[0]));
        // window.location.href = "http://localhost:3000/Noticias";  //entra por app y si se descomenta rompe noticias 
      }  
        console.log("Este es el nombre del GetUser",nombre,password)
        reset();                                 
     }
} 

let reset = () => {
    setNombre("");
    setPassword("")
}

  return ( 
    <div className="fondo">
    <div className="cajaLogin"> 
          <div><h2 className="tituloLoggin">INICIA SESION</h2></div>
      <div className="inputLogin">
      <input className="nomPass" type="text" value={nombre} placeholder="nombre" name="nombre" onChange={(e) => setNombre(e.target.value)} />
      <input className="nomPass" type="password" value={password} placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} /> 
      </div>
       <button className="btnLogin" onClick={realizarLogin}>Iniciar Sesion</button>
      <div className="linkRegistrar"> 
        si aun no esta registrado <br/>
      <Link to="/AltaUsuario" >registrate aqui</Link>
      </div>
    </div> 
    </div>
  ); 
} 

export default Loggin;