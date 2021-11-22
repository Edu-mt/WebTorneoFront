import React, { useState, useEffect } from "react";
import { traerTorneo } from "../../../services/user";
import "./Noticias.css";

export default function Noticias() {
    const [infoNoticias, setInfoNoticias] = useState([]);
    const [nombreTorneo, setNombreTorneo] = useState("");

       
    useEffect( async() => {       
        const torneoTraido = await traerTorneo();                
        const arrayNoticias = new Array();
        console.log("Esto es torneoTraido",  torneoTraido);
        console.log("Esto es torneoTraido.ganadores:",  torneoTraido[0].ganadores);
        console.log("Esto es torneoTraido.ganadores.length:",  torneoTraido[0].ganadores.length);
        setNombreTorneo(torneoTraido[0].nombreTorneo);
        for (let a=0 ; a < torneoTraido[0].ganadores.length; a++) {
            let g = torneoTraido[0].ganadores[a].indice
            var info = {ganador: torneoTraido[0].ganadores[a].resultados , equipo1:torneoTraido[0].arrayPartidas[g].equipo1 , equipo2:torneoTraido[0].arrayPartidas[g].equipo2}
            arrayNoticias.push(info);
            console.log("esto es arrayNoticias:",  arrayNoticias);
        }
        setInfoNoticias(arrayNoticias);
        console.log("esto es infoNoticias:",  infoNoticias);
      }, []);         
    
    return (
        <div>
            Noticias del {nombreTorneo}
            <div>                
                {infoNoticias.map((info) => {
                    return (
                    <>                  
                        <div>En el partido disputado entre el {info.equipo1} y el {info.equipo2} el ganador ha sido el {info.ganador}. </div>                  
                        <br/>
                    </>
                    );
                })}                
            </div>      
        </div>
    )
}