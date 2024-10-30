import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from "./views/MisTurnos/MisTurnos"
import Register from './views/Register/Register'
import Styles from "./App.module.css"
import Navbar from './components/NavBar/Navbar'
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import NotFound from './views/NotFound/NotFound'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isLogged, setIsLogged] = useState(localStorage.getItem("loggin"))
  const [isNotFound, setNotFound] = useState(false)

  useEffect(() => {

    const validRoutes = ["/", "/login", "/register", "/misturnos"]
    if(!validRoutes.includes(location.pathname)) setNotFound(true)
    else setNotFound(false)

    if(!isLogged && location.pathname !== "/login" && location.pathname !== "/register"){
      navigate("/login")
    }

    if(isLogged && location.pathname === "/login" || isLogged && location.pathname === "/register"){
      navigate("/")
    }

  }, [location.pathname, isLogged, navigate])
  

  return (
    <>
      {
        !isLogged ? (
          <main className={Styles.main}>
            <Routes>
              <Route path="/login" element={<Login setIsLogged={setIsLogged}/>} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        ) : (
          <> 
            { !isNotFound && (
                <header>
                    <span> LOGO </span>
                    <Navbar setIsLogged={setIsLogged}/>
                </header>
            )}
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/misturnos" element={<MisTurnos />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )
      }
    </>
  )
}

export default App


