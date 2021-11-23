import React, { useState, useEffect } from "react";
import { traerTorneo } from "../../../services/user";
import {  useSelector  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";
import { addGanador , changeGanador } from "../../../services/user";
import "./Calendario.css";

function VerTorneos() {
    const [mostrarTorneo, setMostrarTorneo] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [botones, setBotones] = useState(false);
    const datosUsuario = useSelector(selectDataUser);
    const [indice, setIndice] = useState(""); 
    const [jornadaReciente, setJornadaReciente] = useState([]);   

    useEffect( async() => { 
      
        const torneoTraido = await traerTorneo();
        if(torneoTraido!=0){
        setMostrarTorneo(torneoTraido);
        console.log("TORNEOTRAIDO", torneoTraido);

        const jornadasTorneo = torneoTraido[0].jornadas;
        console.log("esto es jornadasTorneo", jornadasTorneo);
        let j = jornadasTorneo.length-1;
        console.log("esto es longitudJornada", j);
        const ultimaJornada = torneoTraido[0].jornadas[j];
        console.log("esto es ultimaJornada", ultimaJornada);
        setJornadaReciente(ultimaJornada);

        }
      }, []);       
      
      console.log("PUES AQUI ESTA", mostrarTorneo);
      console.log("esta es la jornadaReciente", jornadaReciente);

      const cambiarResultado = (event,index) => {
        const prueba = resultados;
        prueba.splice(0, 1, event.target.value); 
        // prueba.push(event.target.value)  
        setResultados(prueba);
        console.log("PROBANDO LA PRUEBA",resultados);
        setBotones(true);
        console.log("index cambiarResultado",index);
        setIndice(index);
      };
      
      const enviarGanador = async() => {
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res = await addGanador(data);
        console.log("----ENVIAR GANADOR---", data); 
        setBotones(false);        
      };

      const modificarGanador = async() => {
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res = await changeGanador(data);
        console.log("----Cambiar GANADOR---", data); 
        setBotones(false);        
      };
     
    
    return (
        <div>
            
        <div>
          {/* <div>{mostrarTorneo.nombreTorneo}</div> */}
          <div>
            {jornadaReciente.map((equipos, index) => {
              return (
                <>
                  <div>
                     <div className="tablaEquipos">
                      <div className="equip">{equipos.equipo1}</div>
                      <div className="vs">{" "}{" "+"VS"+" "}{" "}</div>
                      <div className="equip">{equipos.equipo2}{" "}</div><br/>
                     </div>
                     
                    {datosUsuario.admin? (<select className="selectGnanador" value={resultados[index]} onChange={(event)=>cambiarResultado(event,index)}>
                    {/* <option selected >{ganador?gandor:"seleccionar ganador"}</option> 
                    Esto es lo que dijo el profesor para que se quedase el valor si ya 
                    habian metido un resultado en la base de datos cuando cambiemos el estado de ganador*/}
                    <option selected >Seleccionar ganador</option>
                        <option value={equipos.equipo1}>{equipos.equipo1}</option>
                        <option value={equipos.equipo2}>{equipos.equipo2}</option>  
                    </select>)  
                    :
                   <div></div>
                    }
                    
                  </div>
                  <br/>
                </>
              );
            })}
          </div>
        </div>
      
       {botones === true && (<button className="btnGnanador" onClick={enviarGanador}>Enviar Ganador</button>)}
       {botones === true && (<button className="btnGnanador" onClick={modificarGanador}>Modificar Ganador</button>)}
        </div>
    )
}

export default VerTorneos
