import { Routes, Route } from "react-router-dom"
import Cadastro from "./components/cadastro/Cadastro"
import Login from "./components/login/Login"

function RouterApp() {
  return (
    <Routes>
      <Route path="/cadastro" element={ <Cadastro /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>
  )
}

export default RouterApp