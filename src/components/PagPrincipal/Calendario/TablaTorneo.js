import axios from "axios" 
import { traerTorneo } from "../../../services/user";
import { useState,useEffect } from 'react'; 
import styled from 'styled-components' 
import "./TablaTorneo.css";



const Wrapper = styled.div` 
display:flex; 
`; 

const WrapJornada = styled.div` 
justify-content: center; 
align-items: flex-end;
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
border-bottom: 2px solid #f6f6f6;
border-top: 2px solid #f6f6f6;
height: 143px;
width: 39px;
border-right: 2px solid #f6f6f6;
`; 

const CajaVaciaSinBordes = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '178px'}; 
width:50px; 
`; 

const Linea = styled.div` 
height:2px; 
background-color:#f6f6f6; 
`; 

function TablaTorneo() { 

  const [jornadas, setJornadas] = useState([]); 


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
          if (numPartidos === 1){
             
            return ( 
             
              <Linea/>
              
            ) 
          } 
          else if ((numPartidos === 1)&& (jornada[1] === null)){ 
            return jornada[0]; 
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
        
          <div className="enfrentamiento"> 
          <div className="equipo1">{jornada[0]}</div>
          <div className="VS"> VS </div>
          <div className="equipo1">{jornada[1]}</div>
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