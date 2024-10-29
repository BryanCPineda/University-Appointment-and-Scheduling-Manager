import { useEffect, useState } from "react"
import Turno from "../../components/Turno/Turno.jsx"
import Style from "./Misturnos.module.css"
import axios from "axios"

const MisTurnos = () => {

  const [turnos, setTurnos] = useState([])

  useEffect(  () => {
        axios.get('http://localhost:3002/appointments')
          .then( response => {
              setTurnos(response.data.data)
          })
          .catch( error => console.log(error))
  }, [])

  return (
    <div className={Style.contenedor}>
            <div className={Style.contenedorH1}>
                <h1> Mis Turnos </h1>
            </div>

            <div className={Style.containerTurns}>
              {
                turnos.length > 0 ? turnos.map( ( turno) => 
                    <Turno 
                      key={turno.id}
                      id={turno.id}
                      date={turno.date}
                      time={turno.time}
                      status={turno.status}
                    />
                ) : (
                  <h1> No hay turnos para mostrar </h1>
                )
              }
            </div>
    </div>
  )
}



export default MisTurnos