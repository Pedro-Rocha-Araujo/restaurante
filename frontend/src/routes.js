import { Routes, Route } from "react-router-dom"
import Cadastro from "./components/cadastro/Cadastro"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import RotaProtegida from "./components/RotaProtegida"

function RouterApp() {
  return (
    <Routes>
      <Route path="/cadastro" element={ <Cadastro /> } />
      <Route path="/" element={ <Login /> } />
      <Route path="/home" element={ <RotaProtegida> <Home /> </RotaProtegida>  } />
    </Routes>
  )
}

export default RouterApp