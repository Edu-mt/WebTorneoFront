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
         <div className="calendario">
         
         {datosUsuario.admin? (           
            <div className="cajaCalendario">                        
                <VerTorneos/>
                <CrearTorneo/>
            </div>           
         )
         : 
         <VerTorneos/>} 
         </div>
     </>   
  );
}

export default Calendario;
