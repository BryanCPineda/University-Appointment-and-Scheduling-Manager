import { Link } from "react-router-dom"
import Styles from "./NotFound.module.css"

const NotFound = () => {
    return (
      <div className={Styles.container}>
          <h1 className={Styles.title}> 404 </h1>
          <p className={Styles.message}> Oops! La pagina que buscas no existe 🔍</p>
          <Link to="/" className={Styles.homeButton}> Volver al home 🏠</Link>
      </div>
    )

}


export default NotFound