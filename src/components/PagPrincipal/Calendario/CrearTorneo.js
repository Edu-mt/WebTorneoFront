import React, { useState, useEffect } from "react";
import { traerEquipos, addTorneo } from "../../../services/user";
import "./Calendario.css";

function CrearTorneo() {
    const [arrayEquipos, setArrayEquipos] = useState([]);
    const [arrayPartidas, setArrayPartidas] = useState([]);
    const [nombreTorneo, setNombreTorneo] = useState(""); 
    const [estadoBoton, setEstadoBoton] = useState(false);
  
    

    useEffect( async() => { 
      
        const equipos = await traerEquipos();
        // setArrayEquipos (equipos);
        var j, x, i;   
        for (i = equipos.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = equipos[i];
          equipos[i] = equipos[j];
          equipos[j] = x;          
        }   
        setArrayEquipos (equipos);
        console.log("traer equipos server", arrayEquipos);
      }, []); 
     
    
      function parejasEquipos() {
        const equiposFinal = new Array(); 
        setEstadoBoton(true);
      var a;
        for (a=0 ; a < arrayEquipos.length/2; a++) {
          var b = 2*a;
          var objeto = { equipo1:arrayEquipos[b].nombreEquipo , equipo2:arrayEquipos[b+1].nombreEquipo}
          equiposFinal.push(objeto);      
        }
        setArrayPartidas(equiposFinal);

      }    

    

      const enviarDatosTorneo = async(event) => {
        const data = {
          nombreTorneo: nombreTorneo,
          arrayPartidas:arrayPartidas,
        };
        const res = await addTorneo(data);
        console.log("----ENVIAR DATOS TORNEO---", data); 
     
      };

    return (
        <div> 
          <br/>   
        <input 
        className="nomTorneo"
        type="text" 
        placeholder="Nombre del torneo" 
        onChange={(e) => 
        setNombreTorneo(e.target.value)}></input>
        {arrayPartidas.map((data, index) => {
            return (
            <>
                <div className="">
                <div>
                    
                    <tr>
                        <th>
                           
                            {data.equipo1}{"----"}
                        </th>
                        <th>
                            VS{"----"}
                        </th>
                        <th>{data.equipo2}{" "}
                           
                        </th>                            
                        </tr>
                </div>
                </div>
            </>
            );
        })
        }
        <button className="btnGenerarTorneo" onClick={parejasEquipos}>Generar Torneo</button>
         {estadoBoton === true && (<button onClick={enviarDatosTorneo}>Guardar datos torneo</button>)}
        
        
        </div>
    )
}

export default CrearTorneo
