import axios from "axios" 
import { traerTorneo } from "../../../services/user";
import { useState,useEffect } from 'react'; 
import styled from 'styled-components' 
import "./TablaTorneo.css";



const Wrapper = styled.div` 
display:flex; 
`; 

const WrapJornada8 = styled.div` 
justify-content:center; 
align-items: flex-end;
display: flex; 
flex-direction: column; 
margin:10px 
`; 
const WrapJornada16 = styled.div` 
justify-content:space-evenly;
align-items: flex-end;
display: flex; 
flex-direction: column; 
margin:10px 
`; 
const WrapJornada32 = styled.div` 
justify-content:space-evenly; 
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

const Cajasvacias8 = styled.div` 
width:40px; 
// height:100px; 
display:flex; 
flex-direction:column; 
// margin-top:5px; 
justify-content:center; 
`; 
const Cajasvacias16 = styled.div` 
width:40px; 
// height:100px; 
display:flex; 
flex-direction:column; 
// margin-top:5px; 
justify-content:center; 
`; 
const Cajasvacias32 = styled.div` 
width:40px; 
// height:100px; 
display:flex; 
flex-direction:column; 
// margin-top:5px; 
justify-content:center; 
`; 

const CajaVaciaBordes8 = styled.div` 
border-style: solid;
    border-left: none;
    border-color: #fdf4e8;
    border-width: 2px;
    height: 143px;
    width: 39px;
`; 
const CajaVaciaBordes16 = styled.div` 
border-style: solid;
    border-left: none;
    border-color: #fdf4e8;
    border-width: 2px;
    height: 143px;
    width: 39px;

`; 
const CajaVaciaBordes162 = styled.div`
border-bottom: 2px solid #fdf4e8;
border-top: 2px solid #fdf4e8;
height: 250px;
width: 39px;
border-right: 2px solid #fdf4e8;
margin-bottom: 27px;
margin-top: 28px;
`; 
const CajaVaciaBordes161 = styled.div`
border-bottom: 2px solid #fdf4e8;
border-top: 2px solid #fdf4e8;
height: 490px;
width: 39px;
border-right: 2px solid #fdf4e8;
`; 
const CajaVaciaBordes32 = styled.div`
border-style: solid;
    border-left: none;
    border-color: #fdf4e8;
    border-width: 2px;
    height: 143px;
    width: 39px;
`; 
const CajaVaciaBordes324 = styled.div`
border-bottom: 2px solid #fdf4e8;
border-top: 2px solid #fdf4e8;
height: 265px;
width: 39px;
border-right: 2px solid #fdf4e8;
`; 
const CajaVaciaBordes322 = styled.div`
border-bottom: 2px solid #fdf4e8;
border-top: 2px solid #fdf4e8;
height: 570px;
width: 39px;
border-right: 2px solid #fdf4e8;
`; 
const CajaVaciaBordes321 = styled.div`
border-bottom: 2px solid #fdf4e8;
border-top: 2px solid #fdf4e8;
height: 950px;
width: 39px;
border-right: 2px solid #fdf4e8;
`; 


const CajaVaciaSinBordes8 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '178px'}; 
width:50px; 
`; 
const CajaVaciaSinBordes16 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '178px'}; 
width:50px; 
`; 
const CajaVaciaSinBordes162 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '200px'}; 
width:50px;
`;
const CajaVaciaSinBordes32 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '180px'}; 
width:50px; 
`; 
const CajaVaciaSinBordes324 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '345px'}; 
width:50px; 
`; 
const CajaVaciaSinBordes322 = styled.div` 
height:${props => props.posicion === 0 ? '0px' : '515px'}; 
width:50px; 
`;


const Linea = styled.div` 
height:2px; 
background-color:#f6f6f6; 
`; 

function TablaTorneo() { 

  const [jornadas, setJornadas] = useState([]); 
  const[vista8,setVista8]=useState(false);
  const[vista16,setVista16]=useState(false);
  const[vista32,setVista32]=useState(false);
  console.log("AQUI ",vista8)
  console.log("AQUI JORNADAS",jornadas)


  useEffect( async() => { 
   
    const torneoTraido = await traerTorneo();
    console.log("torneo Traido",torneoTraido)
    if(torneoTraido!=0){
    setJornadas(torneoTraido[0].jornadas)
    if(torneoTraido[0].jornadas[0].length === 4){
      setVista8(true)
    }else if(torneoTraido[0].jornadas[0].length === 8){
      setVista16(true)
    }else if(torneoTraido[0].jornadas[0].length===16){
      setVista32(true)
    }
  };
    
  }, []);       

  
 

  const pintarCajasVacias8 = (index, numPartidos, jornada) => { 
    let numeroCajas = jornadas.length; 
    console.log(numPartidos) 
    console.log(jornada) 

    return ( 
      <Cajasvacias8 altura={index}> 
        {/* <div style={{height:"10px"}} /> */} 
        {jornadas[index].map((d, index) => { 
          if (numPartidos === 1){
             
            return ( 
              jornada.length===2?
              <Linea></Linea>
              :
              ""
            ) 
          // } 
          // else if (jornada[0][1] === []) { 
          //   return jornada[0][1]; 
          } 
          else { 
            return ( 
              index % 2 === 0 && 
              <> 
                <CajaVaciaSinBordes8 posicion={index}></CajaVaciaSinBordes8> 
                <CajaVaciaBordes8></CajaVaciaBordes8> 
              </> 
            ) 
          } 
        })} 
      </Cajasvacias8> 
    ) 
  } 
  
  const pintarCajasVacias16 = (index, numPartidos, jornada) => { 
    let numeroCajas = jornadas.length; 
    console.log(numPartidos) 
    console.log(jornada) 

    return ( 
      <Cajasvacias16 altura={index}> 
        {/* <div style={{height:"10px"}} /> */} 
        {jornadas[index].map((d, index) => { 
          if (numPartidos === 1){
             
            return ( 
              jornada.length===2?
              <Linea></Linea>
              :
              ""
            ) 
          // } 
          // else if (jornada[0][1] === []) { 
          //   return jornada[0][1]; 
          } 
          else { 
            return ( 
              index % 2 === 0 && 
              <> 
               {numPartidos === 8 && (
                 <>
                <CajaVaciaSinBordes16 posicion={index}></CajaVaciaSinBordes16> 
                <CajaVaciaBordes16></CajaVaciaBordes16> 
                </>
               )}
                {numPartidos === 4 && (
                 <>
                  <CajaVaciaSinBordes162 posicion={index}></CajaVaciaSinBordes162>
                <CajaVaciaBordes162></CajaVaciaBordes162> 
                </>
                )}
                    {numPartidos === 2 && (
                 <>
                <CajaVaciaBordes161></CajaVaciaBordes161> 
                </>
                )}

              </> 
            ) 
          } 
        })} 
      </Cajasvacias16> 
    ) 
  } 
  
  const pintarCajasVacias32 = (index, numPartidos, jornada) => { 
    let numeroCajas = jornadas.length; 
    console.log(numPartidos) 
    console.log(jornada) 

    return ( 
      <Cajasvacias32 altura={index}> 
        {/* <div style={{height:"10px"}} /> */} 
        {jornadas[index].map((d, index) => { 
          if (numPartidos === 1){
             
            return ( 
              jornada.length===2?
              <Linea></Linea>
              :
              ""
            ) 
          // } 
          // else if (jornada[0][1] === []) { 
          //   return jornada[0][1]; 
          } 
          else { 
            return ( 
              index % 2 === 0 && 
              <> 
                 {numPartidos === 16 && (
                 <>
                <CajaVaciaSinBordes32 posicion={index}></CajaVaciaSinBordes32> 
                <CajaVaciaBordes32></CajaVaciaBordes32> 
                </>
               )}
               {numPartidos === 8 && (
                 <>
                <CajaVaciaSinBordes324 posicion={index}></CajaVaciaSinBordes324> 
                <CajaVaciaBordes324></CajaVaciaBordes324> 
                </>
               )}
                {numPartidos === 4 && (
                 <>
                  <CajaVaciaSinBordes322 posicion={index}></CajaVaciaSinBordes322>
                <CajaVaciaBordes322></CajaVaciaBordes322> 
                </>
                )}
                    {numPartidos === 2 && (
                 <>
                <CajaVaciaBordes321></CajaVaciaBordes321> 
                </>
                )}

              </> 
            ) 
          } 
        })} 
      </Cajasvacias32> 
    ) 
  } 

 
 

  const pintarJornada8 = (jornada) => { 
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

        <div className="ganador"> 
          <div className="tituloGanador">¡GANADOR!</div> <br/>
          <div className="equipoGanador">{jornada[0]}</div>
        </div> 
    ) 
  } 
  const pintarJornada16 = (jornada) => { 
    console.log(jornada) 
    return ( 
      jornada[1] ? 
        <Partido> 
        
          <div className="enfrentamiento-16"> 
          <div className="equipo1-16">{jornada[0]}</div>
          <div className="VS-16"> VS </div>
          <div className="equipo1-16">{jornada[1]}</div>
          </div> 
         
        </Partido> 
        : 

        <div className="ganador-16"> 
          <div className="tituloGanador-16">¡GANADOR!</div> <br/>
          <div className="equipoGanador-16">{jornada[0]}</div>
        </div> 
    ) 
  } 
  const pintarJornada32 = (jornada) => { 
    console.log(jornada) 
    return ( 
      jornada[1] ? 
        <Partido> 
        
          <div className="enfrentamiento-32"> 
          <div className="equipo1-32">{jornada[0]}</div>
          <div className="VS-32"> VS </div>
          <div className="equipo1-32">{jornada[1]}</div>
          </div> 
         
        </Partido> 
        : 

        <div className="ganador-32"> 
          <div className="tituloGanador-32">¡GANADOR!</div> <br/>
          <div className="equipoGanador-32">{jornada[0]}</div>
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
          {vista8===true &&(
            <>
            <WrapJornada8> 
              {jornada.map((data) => { 
                return ( 
                   pintarJornada8(data) 
                ) 
              })} 
            </WrapJornada8>
            {pintarCajasVacias8(index, numPartidos, jornada)} 
            </>
          )}
             {vista16===true &&(
            <>
            <WrapJornada16> 
              {jornada.map((data) => { 
                return ( 
                   pintarJornada16(data) 
                ) 
              })} 
            </WrapJornada16>
            {pintarCajasVacias16(index, numPartidos, jornada)} 
            </>
          )}
             {vista32===true &&(
            <>
            <WrapJornada32> 
              {jornada.map((data) => { 
                return ( 
                   pintarJornada32(data) 
                ) 
              })} 
            </WrapJornada32>
            {pintarCajasVacias32(index, numPartidos, jornada)} 
            </>
          )}
          </> 
        ) 
      })} 
    </Wrapper> 
  ); 
} 

 export default TablaTorneo; 

