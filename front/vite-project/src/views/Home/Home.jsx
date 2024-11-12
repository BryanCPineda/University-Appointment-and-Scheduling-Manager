import { Link } from "react-router-dom";
import Styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={Styles.homeContainer}>
      <h1 className={Styles.welcomeTitle}>¡Bienvenid@!</h1>
      <p className={Styles.welcomeMessage}>
        ¿Quieres
        <Link to="/agendarturno" className={Styles.link}>
          agendar
        </Link>
        un nuevo turno hoy?
      </p>
    </div>
  );
};

export default Home;