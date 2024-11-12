import { useContext, useEffect,  } from "react"
import Turno from "../../components/Turno/Turno.jsx"
import Style from "./Misturnos.module.css"
import { UsersContext } from "../../context/UsersContext.jsx"

const MisTurnos = () => {

  const { getUserAppointments, user, userAppointments } = useContext(UsersContext)

  useEffect(  () => {
      getUserAppointments(user)
  }, [])

  return (
    <div className={Style.contenedor}>
            <div className={Style.contenedorH1}>
                <h1> Mis Turnos </h1>
            </div>

            <div className={Style.containerTurns}>
              {
                userAppointments.length > 0 ? userAppointments.map( ( turno) => 
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