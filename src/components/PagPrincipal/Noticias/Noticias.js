import React, { useState, useEffect } from "react";
import { traerTorneo } from "../../../services/user";
import "./Noticias.css";

export default function Noticias() {
    const [infoNoticias, setInfoNoticias] = useState([]);
    const [nombreTorneo, setNombreTorneo] = useState("");

       
    // useEffect( async() => {       
    //     const torneoTraido = await traerTorneo();  
    //     if (torneoTraido != 0){
    //         const arrayNoticias = new Array();
    //         console.log("Esto es torneoTraido",  torneoTraido);
    //         console.log("Esto es torneoTraido.ganadores:",  torneoTraido[0].ganadores);
    //         console.log("Esto es torneoTraido.ganadores.length:",  torneoTraido[0].ganadores.length);
    //         setNombreTorneo(torneoTraido[0].nombreTorneo);
    //         for (let a=0 ; a < torneoTraido[0].ganadores.length; a++) {
    //             let g = torneoTraido[0].ganadores[a].indice
    //             var info = {ganador: torneoTraido[0].ganadores[a].resultados , equipo1:torneoTraido[0].arrayPartidas[g][0] , equipo2:torneoTraido[0].arrayPartidas[g][1]}
    //             arrayNoticias.push(info);
    //             console.log("esto es arrayNoticias:",  arrayNoticias);
    //         }
    //         setInfoNoticias(arrayNoticias);
    //         console.log("esto es infoNoticias:",  infoNoticias);
    //      }
    // }, []);         

           
    useEffect( async() => {       
        const torneoTraido = await traerTorneo();  
        if (torneoTraido != 0){
            const arrayNoticiasFinal = new Array();
            console.log("Esto es torneoTraido",  torneoTraido);
            console.log("Esto es torneoTraido.jornadas:",  torneoTraido[0].jornadas);
            console.log("Esto es torneoTraido.jornadas.length:",  torneoTraido[0].jornadas.length);
            // setNombreTorneo(torneoTraido[0].nombreTorneo);
            for (let a=0 ; a < torneoTraido[0].jornadas.length; a++) {  
                let arrayNoticias = [];
              
                for(let b=0 ; b < torneoTraido[0].jornadas[a].length ; b++){
                    var info = [torneoTraido[0].jornadas[a][b][0] , torneoTraido[0].jornadas[a][b][1]];
                    arrayNoticias.push(info);
                    console.log("esto es INFO:",  info);
                    console.log("esto es arrayNoticias:",  arrayNoticias);                   
                }
                arrayNoticiasFinal.push(arrayNoticias);
                arrayNoticias = [];
                 
                console.log("esto es arrayNoticiasFinal:",  arrayNoticiasFinal);               
            }
            setInfoNoticias(arrayNoticiasFinal);
            // setInfoNoticias(arrayNoticias);
         }
    }, []); 
    console.log("esto es infoNoticias 2:",  infoNoticias);

    return (
        <div>
            Noticias
            <div>      
                {/* <div>{nombreTorneo}</div>           */}
                {infoNoticias.map((data,index) => {
                    return (
                    <>
                        Jornada {index+1}
                        {data.map((info) => {
                        return (
                        <>                                            
                            <div>En el partido disputado entre el {info[0]} y el {info[1]} el ganador ha sido el. </div>                  
                            <br/>
                        </>
                        );
                        })}                          
                    </>
                    );
                })}                
            </div>      
        </div>
    )
}