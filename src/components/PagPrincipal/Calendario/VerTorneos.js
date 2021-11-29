import React, { useState, useEffect } from "react";
import { traerTorneo } from "../../../services/user";
import {  useSelector  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";
import { addGanador , changeGanador, addNoticia } from "../../../services/user";
import "./Calendario.css";
import TablaTorneo from "./TablaTorneo";

function VerTorneos() {
    const [mostrarTorneo, setMostrarTorneo] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [botones, setBotones] = useState(false);
    const datosUsuario = useSelector(selectDataUser);
    const [indice, setIndice] = useState(""); 
    const [jornadaReciente, setJornadaReciente] = useState([]);   
    const [posicionJornada, setPosicionJornada] = useState("");

    useEffect( async() => { 
      
        const torneoTraido = await traerTorneo();
        if(torneoTraido!=0){
        setMostrarTorneo(torneoTraido);
        // console.log("TORNEOTRAIDO", torneoTraido);

        const jornadasTorneo = torneoTraido[0].jornadas;
        // console.log("esto es jornadasTorneo", jornadasTorneo);
        let j = jornadasTorneo.length-1;
        setPosicionJornada(j+1);
        // console.log("esto es longitudJornada", j);
        const ultimaJornada = torneoTraido[0].jornadas[j];
        // console.log("esto es ultimaJornada", ultimaJornada);
        setJornadaReciente(ultimaJornada);

        }
      }, []);       
      
      // console.log("PUES AQUI ESTA", mostrarTorneo);
      // console.log("esta es la jornadaReciente", jornadaReciente);
      console.log("posicion jornada", posicionJornada)
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
      
     

      const enviarGanador = async() => {
        
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res =  addGanador(data);
        console.log("---- PRIMERO ENVIAR GANADOR A USER---", data); 
        setBotones(false);   
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
        const texto = ["El equipo " + resultados + " ha ganado contra " + perdedor + " en la jornada " + posicionJornada];
        console.log(texto);
        const respuesta =  addNoticia(texto); 
        window.location.href = "http://localhost:3000/Noticias";
    
      };

      const modificarGanador = async() => {
        const data = {
          resultados: resultados,
          indice: indice,
        };
        const res = await changeGanador(data);
        // console.log("----Cambiar GANADOR---", data); 
        setBotones(false);     
        window.location.href = "http://localhost:3000/Noticias";
   
      };

      
     
    
    return (
      <>
        <div>
          <TablaTorneo/>
          {datosUsuario.admin?(
            <div>
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
                        
                        <select className="selectGnanador" value={resultados[index]} onChange={(event)=>cambiarResultado(event,index)}>
                        <option selected >Seleccionar ganador</option>
                            <option value={equipos[0]}>{equipos[0]}</option>
                            <option value={equipos[1]}>{equipos[1]}</option>  
                        </select>                    
                      </div>
                      <br/>
                    </>
                  );
                })}
              </div>
            </div>
          )
          :
          <div></div>
          }      
          {botones === true && (<button className="btnGnanador" onClick={enviarGanador}>Enviar Ganador</button>)}
          {botones === true && (<button className="btnGnanador" onClick={modificarGanador}>Modificar Ganador</button>)}
        </div>      
       </> 
    )
    
}

export default VerTorneos