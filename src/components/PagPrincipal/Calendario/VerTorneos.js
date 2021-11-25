import React, { useState, useEffect } from "react";
import { traerTorneo } from "../../../services/user";
import {  useSelector  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";
import { addGanador , changeGanador } from "../../../services/user";
import "./Calendario.css";
import TablaTorneo from "./TablaTorneo";

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
        // console.log("TORNEOTRAIDO", torneoTraido);

        const jornadasTorneo = torneoTraido[0].jornadas;
        // console.log("esto es jornadasTorneo", jornadasTorneo);
        let j = jornadasTorneo.length-1;
        // console.log("esto es longitudJornada", j);
        const ultimaJornada = torneoTraido[0].jornadas[j];
        // console.log("esto es ultimaJornada", ultimaJornada);
        setJornadaReciente(ultimaJornada);

        }
      }, []);       
      
      // console.log("PUES AQUI ESTA", mostrarTorneo);
      // console.log("esta es la jornadaReciente", jornadaReciente);

      const cambiarResultado = (event,index) => {
        const prueba = resultados;
        prueba.splice(0, 1, event.target.value); 
        // prueba.push(event.target.value)  
        setResultados(prueba);
        console.log("PROBANDO LA PRUEBA",resultados);
        setBotones(true);
        // console.log("index cambiarResultado",index);
        setIndice(index);
      };
      
      
      const enviarGanador = async(event) => {
        var perdedor;
        console.log("JORNADARECIENTE" , jornadaReciente[0][0])

        for(let z=0 ; z < jornadaReciente.length ; z++){
          if(resultados[0] === jornadaReciente[z][0] || resultados[0] === jornadaReciente[z][1] ){
            if(resultados[0] === jornadaReciente[z][0]){
              perdedor = jornadaReciente[z][1];
            }
            else{
              perdedor = jornadaReciente[z][0];
            }
          }
        }        
        console.log("PERDEDOR" , perdedor);
        const texto = ["el equipo" + resultados + " ha ganado contra" + perdedor];
        console.log(texto);
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res =  addGanador(data);
        console.log("---- PRIMERO ENVIAR GANADOR A USER---", data); 
        setBotones(false);        
      };

      const modificarGanador = async() => {
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res = await changeGanador(data);
        // console.log("----Cambiar GANADOR---", data); 
        setBotones(false);        
      };
     
    
    return (
      
        <div>
          <TablaTorneo/>
        <div>
          {/* <div>{mostrarTorneo.nombreTorneo}</div> */}
          <div>
            {jornadaReciente.map((equipos, index) => {
              return (
                <>
                  <div>
                     <div className="tablaEquipos">
                      <div className="equip">{equipos[0]}</div>
                      <div className="vs">{" "}{" "+"VS"+" "}{" "}</div>
                      <div className="equip">{equipos[1]}{" "}</div><br/>
                     </div>
                     
                    {datosUsuario.admin? (<select className="selectGnanador" value={resultados[index]} onChange={(event)=>cambiarResultado(event,index)}>
                    {/* <option selected >{ganador?gandor:"seleccionar ganador"}</option> 
                    Esto es lo que dijo el profesor para que se quedase el valor si ya 
                    habian metido un resultado en la base de datos cuando cambiemos el estado de ganador*/}
                    <option selected >Seleccionar ganador</option>
                        <option value={equipos[0]}>{equipos[0]}</option>
                        <option value={equipos[1]}>{equipos[1]}</option>  
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