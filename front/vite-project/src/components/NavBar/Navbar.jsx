 
import { Link, useNavigate } from "react-router-dom"
import Styles from "./Navbar.module.css"
import Swal from "sweetalert2"
import { useContext } from "react"
import { UsersContext } from "../../context/UsersContext"

function Navbar(){

  const { logOutUser } = useContext(UsersContext)

  const navigate = useNavigate()
  const handleLogOut = () =>{
    logOutUser()
    Swal.fire({
      icon: "warning",
      title: "Tu sesion fue cerrada correctamente"
    })
    navigate("/login")
  }

  return(
    <div className={Styles.navbarContainer}>
      <nav className={Styles.navbar}>
          <li className={Styles.navItem}>
            <Link 
              to="/"
              className={`${Styles.navLink} ${location.pathname === "/" ? Styles.active : ""}`}
            >
              Home
            </Link>
          </li>
          <li className={Styles.navItem}>
            <Link to="/misturnos" className={`${Styles.navLink} ${location.pathname === "/misturnos" ? Styles.active : ""} `}>
              Mis Turnos
            </Link>
          </li>
          <li className={Styles.navItem}>
            <Link to="/agendarturno" className={`${Styles.navLink} ${location.pathname === "/agendarturno" ? Styles.active : ""} `}>
              Agendar Turno
            </Link>
          </li>
          <li className={`${Styles.navItem} ${Styles.navLink} `} onClick={handleLogOut}>
            LogOut
          </li>
      </nav>
    </div>
  )

}


export default Navbar