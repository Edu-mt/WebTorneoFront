import React, {useState} from 'react'
import "./Perfil.css";
import { addFoto } from "../../../services/user";
import PropTypes from 'prop-types';
import {  useSelector  } from "react-redux";
import { selectDataUser } from "../../../features/userSlice";


function Perfil () {
  const datosUsuario = useSelector(selectDataUser);
  console.log("DATOS DEL USUARIO--------",datosUsuario)
  let nombreUsuario = datosUsuario.nombre;
  const [foto, setFoto] = useState('');
  const [fr, setFr] = useState(new FileReader());
  const [myFileField, setMyFileField] = useState(React.createRef())

  function traerImagen() {
    const image = fr.result;
    actualizarFoto(image);
  }

 function actualizarFoto(foto) {
  setFoto({ foto: foto });
  }

  function actualizarImagen(ev) {
    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];
      fr.addEventListener('load', traerImagen);
      fr.readAsDataURL(myFile);
    }
  }
  console.log("FOTO DE PERFIL",{foto});

  const enviarFoto = async (data) => {
    const fotoSeleccionada = {
      foto: foto.foto,
      usuario: nombreUsuario,
    };
    console.log("------- FOTO SELECCIONADA -------", fotoSeleccionada);
    const res = await addFoto(fotoSeleccionada);
    
  };

    return (
      <div className="cajaPerfil">
        <div className="cajaFotoPerfil">
        <label className="" type="button">
         Añadir foto de perfil
          <input
            type="file"
            ref={myFileField}
            className="cargarFoto"
            onChange={actualizarImagen}
          />
        </label>
  
        <div className="fotoPerfil" style={{ backgroundImage: `url(${foto.foto})`}}></div>
        <button onClick={() => enviarFoto()} className="btnEnviarFoto" >Guardar avatar</button>
      </div>
            <div>equipo:{datosUsuario.nombreEquipo}</div>
            <div>nombre:{datosUsuario.nombre}</div>
            <div>{datosUsuario.email}</div>
            <div className="fotoGrande" style={{ backgroundImage: `url(${datosUsuario.avatar})`}}> </div>
      </div>
    );
}

Perfil.propTypes = {
  foto: PropTypes.string.isRequired,
  actualizarFoto: PropTypes.func.isRequired
};
export default Perfil;