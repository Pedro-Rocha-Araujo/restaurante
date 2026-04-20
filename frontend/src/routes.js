import { Routes, Route } from "react-router-dom"
import Cadastro from "./components/cadastro/Cadastro"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import RotaProtegida from "./components/RotaProtegida"
import NovoPrato from "./components/novo/NovoPrato"
import TodosPratos from "./components/pratos/TodosPratos"
import EditarPrato from "./components/editar/EditarPrato"

function RouterApp() {
  return (
    <Routes>
      <Route path="/cadastro" element={ <Cadastro /> } />
      <Route path="/" element={ <Login /> } />
      <Route path="/home" element={ <> <Home /> </>  } />
      <Route path="/novo-prato" element={ <NovoPrato /> } />
      <Route path="/pratos" element={ <TodosPratos /> } />
      <Route path="/editar-prato/:id" element={ <EditarPrato /> } />
    </Routes>
  )
}

export default RouterApp