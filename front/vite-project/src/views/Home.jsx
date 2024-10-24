import Navbar from "../components/Navbar"
import Style from "./Home.module.css"
function Home(){

  return(
    <>
      <h1 className={Style.titulo} > Estamos en home</h1>

      <Navbar />
    </>
  )
}


export default Home