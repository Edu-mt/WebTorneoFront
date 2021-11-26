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
        <div>
            Noticias
            <div>      
               
            {
      infoNoticias.map((data, index) => {
        return (
          <>
            <div className="">             
             <div className="">{data.texto}</div>
                         
            </div>
          </>
        );
      })
    }
            </div>      
        </div>
    )
}