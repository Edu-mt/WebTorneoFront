import axios from "axios" 
import { traerTorneo } from "../../../services/user";
import { useState,useEffect } from 'react'; 
import styled from 'styled-components' 



const Wrapper = styled.div` 
display:flex; 
`; 

const WrapJornada = styled.div` 
justify-content: center; 
align-items: center; 
display: flex; 
flex-direction: column; 
margin:10px 
`; 

 
 

const Jornada = styled.div` 
`; 

const Partido = styled.div` 
margin-bottom:15px; 
margin-top:15px; 
`; 

const Cajasvacias = styled.div` 
width:40px; 
// height:100px; 
display:flex; 
flex-direction:column; 
// margin-top:5px; 
justify-content:center; 
`; 

const CajaVaciaBordes = styled.div` 
height:50px; 
border-bottom:2px solid red; 
border-top:2px solid red; 
width:50px; 
border-right:2px solid red; 
`; 

const CajaVaciaSinBordes = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '50px'}; 
width:50px; 
`; 

const Linea = styled.div` 
height:2px; 
background-color:red; 
`; 

function TablaTorneo() { 

  const [jornadas, setJornadas] = useState([]); 
  // const jornadas = [ 
  //   [["equipo1", "equipo2"], ["equipo3", "equipo4"], ["equipo5", "equipo6"], ["equipo7", "equipo8"]], 
  //   [["equipo1", "equipo2"], ["equipo3", "equipo4"]], 
  //   [["equipo1", "equipo2"]], 
  //   [["equipo2"]] 
  // ]; 


  useEffect( async() => { 
   
    const torneoTraido = await traerTorneo();
    if(torneoTraido!=0){
    setJornadas(torneoTraido[0].jornadas)}

    
  }, []);       


 

  const pintarCajasVacias = (index, numPartidos, jornada) => { 
    let numeroCajas = jornadas.length; 
    console.log(numPartidos) 
    console.log(jornada) 

    return ( 
      <Cajasvacias altura={index}> 
        {/* <div style={{height:"10px"}} /> */} 
        {jornadas[index].map((d, index) => { 
          if (numPartidos === 1) { 
            return ( 
              <Linea></Linea> 
            ) 
          } 
          else if (jornada[0][1] === undefined) { 
            return null; 
          } 
          else { 
            return ( 
              index % 2 === 0 && 
              <> 
                <CajaVaciaSinBordes posicion={index}></CajaVaciaSinBordes> 
                <CajaVaciaBordes></CajaVaciaBordes> 
              </> 
            ) 
          } 
        })} 
      </Cajasvacias> 
    ) 
  } 

 
 

  const pintarJornada = (jornada) => { 
    console.log(jornada) 
    return ( 
      jornada[1] ? 
        <Partido> 
          <div> 
            {jornada[0] + " versus " + jornada[1]} 
          </div> 
        </Partido> 
        : 
        <div> 
          {jornada[0]} 
        </div> 
    ) 
  } 

  return ( 
    <Wrapper className="wrapper" > 
      {jornadas.map((jornada, index) => { 
        console.log(jornada.length) 
        let numPartidos = jornada.length; 
        return ( 
          <> 
            <WrapJornada> 
              {jornada.map((data) => { 
                return ( 
                  pintarJornada(data) 
                ) 
              })} 
            </WrapJornada> 
            {pintarCajasVacias(index, numPartidos, jornada)} 
          </> 
        ) 
      })} 
    </Wrapper> 
  ); 
} 

export default TablaTorneo; 