import React, { useState, useEffect } from "react";
import { traerEquipos, addJugador } from "../../../services/user";
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
    const resBuscador = await addJugador(equiposeleccionado);
    console.log("este es el console log del res en Buscador", resBuscador);
  };

  console.log("resultado busquedas");
  console.log(resultBusqueda);
  return (
    <>      
    <div className="CajaUnirseEquipo">
            <input
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
            <div className="">
              <div>
                Nombre: {data.nombreEquipo}{" "}
                <button
                  onClick={() => enviarJugador(data)}
                  className="UnirseEquipo"
                  key={index}
                >
                  Unirse a equipo
                </button>
              </div>
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
