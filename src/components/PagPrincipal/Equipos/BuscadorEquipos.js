import React, { useState, useEffect } from "react";
import { traerEquipos, addJugador, addNoticia } from "../../../services/user";
import {  useDispatch, useSelector  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";
import "./Equipos.css";

function BuscadorEquipos() {
  const [busqueda, setBusqueda] = useState("");
  const [equipos, setEquipos] = useState([]);
  // console.log("este seria de equipos",equipos);
  const [resultBusqueda, setResultBusqueda] = useState(equipos);
  const dataUser = useSelector(selectDataUser);
  let nombreUsuario = dataUser.nombre;


  useEffect(async () => {
    const res = await traerEquipos();
    setEquipos(res);
    setResultBusqueda(res);
     console.log("este es equipos del useffect", resultBusqueda);
     console.log("este es el res de addJugador", res);     
  }, []);



  const updateSearch = (event) => {
    console.log(event);
    console.log(equipos);
    const resultadoBusqueda = equipos.filter(function (data) {
      if (
        data.nombreEquipo
          .toUpperCase()
          .includes(event.target.value.toUpperCase())
      ) {
        return data;
      }
    });
    setBusqueda(event.target.value);
    setResultBusqueda(resultadoBusqueda);
  };

  const enviarJugador = async (data) => {
    const equiposeleccionado = {
      nombreEquipo: data.nombreEquipo,
      usuario: nombreUsuario,
    };
    console.log("equipo seleccionado", equiposeleccionado);
    const resBuscador =  addJugador(equiposeleccionado);
    const respuesta = addNoticia("El usuario: "+ nombreUsuario + " se ha unido al equipo: "+ data.nombreEquipo ); 
    console.log("este es el console log del res en Buscador", resBuscador);
  };

  console.log("resultado busquedas");
  console.log(resultBusqueda);
  return (
    <>      
    <div className="CajaUnirseEquipo">
            <input
            className="inputBuscEquip"
              class="form-control"
              type="text"
              placeholder="Search"
              value={busqueda}
              onChange={updateSearch}
            />
    {
      resultBusqueda.map((data, index) => {
        return (
          <>
            <div className="cajaNombreYBtnUnirseEquipo">             
              {/* <div className="cajaNombreUnirseEquipo"> */}
               
                <div className="equipoUnirseEquipo">{data.nombreEquipo}</div>
                {/* </div> */}
                <button
                  onClick={() => enviarJugador(data)}
                  className="btnUnirseEquipo"
                  key={index} >
                 UNIRSE
                </button>          
            </div>
          </>
        );
      })
    }
    </div>
    </>
  );
}

export default BuscadorEquipos;
