import PropTypes from "prop-types"
import Styles from "./Turno.module.css"
const Turno = ({ id, date, time, status }) => {

  return (
      <div className={Styles.appointmentCard}>
        <div className={Styles.appointmentHeader}>
            <h3>Turno #{id}</h3>
            <span className={status === 'Active' ? Styles.statusActive : Styles.statusInactive}>{status}</span>
        </div>
        <div className={Styles.appointmentDetails}>
            <p><strong>Fecha:</strong> <span>{date}</span></p>
            <p><strong>Hora:</strong> <span>{time}</span></p>
        </div>
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