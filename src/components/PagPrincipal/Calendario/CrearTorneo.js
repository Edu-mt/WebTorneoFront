import React, { useState, useEffect } from "react";
import { traerEquipos, addTorneo , traerTorneo , deleteTorneo , addJornada, addNoticia } from "../../../services/user";
import FinalizarJornada from "./CrearJornada";
import "./Calendario.css";

function CrearTorneo() {
    const [arrayEquipos, setArrayEquipos] = useState([]);
    const [arrayPartidas, setArrayPartidas] = useState([]);
    const [nombreTorneo, setNombreTorneo] = useState(""); 
    const [estadoBotonGuardar, setEstadoBotonGuardar] = useState(false);
    const [estadoBotonGenerar, setestadoBotonGenerar] = useState(true);
    const [vista, setVista] = useState(true);
    const [torneoTraido, setTorneoTraido] = useState([]);
  
    console.log("esto es torneotraido", torneoTraido);    

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

        const torneo = await traerTorneo();
        if(torneo!=0){
          setVista(false);
          setTorneoTraido(torneo);
        }
        
      }, []);      
    
      function parejasEquipos() {
        
        if(arrayEquipos.length === 8 || arrayEquipos.length === 16 || arrayEquipos.length === 32 ){
          const equiposFinal = new Array(); 
          setEstadoBotonGuardar(true);
          setestadoBotonGenerar(false);
        var a;
          for (a=0 ; a < arrayEquipos.length/2; a++) {
            var b = 2*a;
            var objeto = [arrayEquipos[b].nombreEquipo , arrayEquipos[b+1].nombreEquipo]
            equiposFinal.push(objeto);      
          }
          setArrayPartidas(equiposFinal);
        }else{
          alert("hay que meter 8 o 16 o 32 equipos")
        }
   
      }        

      const enviarDatosTorneo = async(event) => {
        const data = {
          nombreTorneo: nombreTorneo,
          arrayPartidas:arrayPartidas,
        };
        const res = await addTorneo(data);
        const respuesta =  addJornada(data.arrayPartidas);
        const respuestaNoticias = addNoticia("Se ha creado el Torneo: "+ data.nombreTorneo); 
       
      };

      const eliminarTorneo = async(event) => {
        const data = {
          nombreTorneo: torneoTraido[0].nombreTorneo,          
        };
        const res = await deleteTorneo(data);
        console.log("----ELIMINAR DATOS TORNEO---", data);      
      };

    return (
        <div> 
          <br/>
          {vista ? (
          <div>                               
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
                                {data[0]}{"----"}
                            </th>
                            <th>
                                VS{"----"}
                            </th>
                            <th>{data[1]}{" "}                            
                            </th>                            
                            </tr>
                    </div>
                    </div>
                </>
                );
            })
            }
            {estadoBotonGenerar === true && (<button className="btnGenerarTorneo" onClick={parejasEquipos}>Generar Torneo</button> )}         
            {estadoBotonGuardar === true && (<button className="btnGenerarTorneo" onClick={enviarDatosTorneo}>Guardar datos torneo</button>)}                
          </div>  
          )
          : 
          <div>
          <button className="btnGenerarTorneo" onClick={eliminarTorneo} >Eliminar Torneo</button>
          <FinalizarJornada/>
         </div>          
          }                        
        </div>
    )
}

export default CrearTorneo
