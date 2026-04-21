import { Routes, Route } from "react-router-dom"

import Login from "./components/login/Login"
import Cadastro from "./components/cadastro/Cadastro"
import Home from "./components/home/Home"
import NovoPrato from "./components/novo/NovoPrato"
import NovoPedido from "./components/novo/NovoPedido"
import TodosPratos from "./components/pratos/TodosPratos"
import TodosPedidos from "./components/pedidos/TodosPedidos"
import EditarPrato from "./components/editar/EditarPrato"

import RotaProtegida from "./components/RotaProtegida"

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/cadastro" element={ <Cadastro /> } />
      <Route path="/home" element={ <> <Home /> </>  } />
      <Route path="/novo-prato" element={ <NovoPrato /> } />
      <Route path="/novo-pedido" element={ <NovoPedido /> } />
      <Route path="/pratos" element={ <TodosPratos /> } />
      <Route path="/pedidos" element={ <TodosPedidos /> } />
      <Route path="/editar-prato/:id" element={ <EditarPrato /> } />
    </Routes>
  )
}

export default RouterApp