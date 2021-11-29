import React, { useState, useEffect } from "react";
import { traerNoticias } from "../../../services/user";
import "./Noticias.css";


export default function Noticias() {
    const [infoNoticias, setInfoNoticias] = useState([]);
       
    useEffect(async () => {
        const res = await traerNoticias();
        res.reverse();
        setInfoNoticias(res);        
      }, []);     

           
    return (
      <>
      <div className="noticias">
      <div>
        <h1 className="tituloNoticias">NOTICIAS</h1>
      </div>
        <div className="CajaNoticias">
           
            
               
            {
      infoNoticias.map((data, index) => {
        return (
          <>
            <div>             
             <div  className="cajitaTexto">{data.texto}</div><br/>
                         
            </div>
          </>
        );
      })
    }
                
        </div>
        </div>
        </>
    )
}