import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Equipos.css";

export default function Equipos() {
    return (
        
          <div className="Equipos">
            {/* <p>Crea o unete a un equipo</p> */}
            <div className="creaUne">
            <div><Link to="/CrearEquipo"><button className="btnEquipos">Crear equipo</button></Link></div>
          <div><Link to="/BuscadorEquipos"><button className="btnEquipos">Unirse equipo</button></Link></div>
        </div>
        </div>
        
       
    )
}
