import { selectDataUser } from "../../../features/userSlice";
import CrearTorneo from "./CrearTorneo";
import {  useSelector  } from "react-redux";
import "./Calendario.css";

import VerTorneos from "./VerTorneos";

function Calendario() {
const datosUsuario = useSelector(selectDataUser);

console.log("admin", datosUsuario.admin)
    
  return (   
         <>  
         
         {datosUsuario.admin? (           
            <div className="cajaCalendario">                        
                <VerTorneos/>
                <CrearTorneo/>
            </div>           
         )
         : 
         <VerTorneos/>} 
     </>   
  );
}

export default Calendario;
