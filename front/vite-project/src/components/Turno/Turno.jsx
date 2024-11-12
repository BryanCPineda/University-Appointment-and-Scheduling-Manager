/* eslint-disable no-unused-vars */
import PropTypes from "prop-types"
import Styles from "./Turno.module.css"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"
import Swal from "sweetalert2"

const Turno = ({ id, date, time, status }) => {

  const { cancelAppointment } = useContext(UsersContext)
  
  const handleCancel = async ( ) => {
        try {
          await cancelAppointment(id)
          Swal.fire({
              icon: "warning",
              color: "red",
              title: "Turno cancelado con exito"
          })
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "No se pudo cancelar el turno, intentelo nuevamente"
          })
        }
  }

  return (
      <div className={Styles.appointmentCard}>
        <div className={Styles.appointmentHeader}>
            <h3>Turno #{id}</h3>
            <span className={status === 'active' ? Styles.statusActive : Styles.statusInactive}>{status}</span>
        </div>
        <div className={Styles.appointmentDetails}>
            <p><strong>Fecha:</strong> <span>{date}</span></p>
            <p><strong>Hora:</strong> <span>{time}</span></p>
        </div>
        <button 
          className={`${Styles.cancelButton} ${status === "cancelled" ? Styles.disable : ""}`}
          onClick={handleCancel}
          disabled={status === "cancelled"}
          > Cancelar Turno </button>
      </div>
  )

}

Turno.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Turno