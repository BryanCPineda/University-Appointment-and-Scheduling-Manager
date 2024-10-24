import Style from "./App.module.css"
import Home from './views/Home'

function App() {
  return (
    <>
      <h1 className={Style.titulo} > HOLA ESTAMOS EN APP </h1>
      <Home />
    </>
  )
}

export default App


