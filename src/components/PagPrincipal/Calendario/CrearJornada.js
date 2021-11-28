import React, { useState, useEffect } from "react";
import { traerEquipos, addTorneo , traerTorneo , deleteTorneo, addJornada , deleteGanadores} from "../../../services/user";
import "./Calendario.css";

function FinalizarJornada() {
    
    // const [arrayGanadoresJornada, setArrayGanadoresJornada,] = useState([]);
    // const [infoTorneo, setInfoTorneo,] = useState([]);

    // useEffect( async() => { 
        
    //     const torneo = await traerTorneo();
    //     setInfoTorneo(torneo);
    //   }, []);   
        

      const enviarDatos = async (event) => {
        const torneo = await traerTorneo();
        if(torneo!=0){ 
        const jornadasTorneo = torneo[0].jornadas;
        let j = jornadasTorneo.length-1;
        const ultimaJornada = torneo[0].jornadas[j];
        let jornadaLength = ultimaJornada.length;

            if(torneo[0].ganadores.length === jornadaLength){
                const ganadoresTorneo = torneo[0].ganadores;
                console.log("GANADORES TORNEO ANTES DEL LENGTH", ganadoresTorneo); 

                if(ganadoresTorneo.length%2 ==0 && ganadoresTorneo.length != 0 ){
                    console.log("esto es ganadoresTorneo", ganadoresTorneo)
                    console.log("esto es ganadoresTorneo[0].resultados", ganadoresTorneo[0].resultados)

                    const equiposFinal = []; 
                    
                    var a;
                    var longitud = ganadoresTorneo.length;
                    console.log("esto es longitud", longitud);
                    
                    for (a=0 ; a < ganadoresTorneo.length/2; a++) {
                        var b = 2*a;
                        var objeto = [ganadoresTorneo[b].resultados , ganadoresTorneo[b+1].resultados]
                        equiposFinal.push(objeto);      
                    }
                    // setArrayGanadoresJornada(equiposFinal);      
                    const res = await addJornada(equiposFinal); 
                    

                    console.log("--- ARRAY GANADORES despues----", equiposFinal); 
                }
                if (ganadoresTorneo.length === 1 ){
                    const equiposFinal = [];                     
                    var objeto = [ganadoresTorneo[0].resultados]
                    equiposFinal.push(objeto);                        
                    const res = await addJornada(equiposFinal); 
                    
                    console.log("--- ARRAY GANADORES despues----", equiposFinal); 
                }
                
            }else{
                alert("Hay que elegir todos los ganadores");
            }
            

           
           
            
        }   

        // const data = {
        //     nombreTorneo: nombreTorneoJornada, (descomentar eso primero)
        //     arrayGanadoresJornada: arrayGanadoresJornada 
        // };
        // const res = await addJornada(arrayGanadoresJornada); 
        // const respuesta = await deleteGanadores(data);
      }
    //   console.log("ENVIANDO GANADORES JORNADA",arrayGanadoresJornada)
     
    return (
        <div>
            <button className="btnGenerarTorneo" onClick={enviarDatos}>Finalizar Jornada</button>
          {/* <br/>
          {vista? (           
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
         : 
         <button className="btnGenerarTorneo" onClick={eliminarTorneo} >Eliminar Torneo</button>}         */}
        </div>
    )
}

export default FinalizarJornada
