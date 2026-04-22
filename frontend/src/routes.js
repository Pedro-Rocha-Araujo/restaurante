import { Routes, Route } from "react-router-dom"

import Login from "./components/login/Login"
import Cadastro from "./components/cadastro/Cadastro"
import Home from "./components/home/Home"
import NovoPrato from "./components/novo/NovoPrato"
import NovoPedido from "./components/novo/NovoPedido"
import TodosPratos from "./components/pratos/TodosPratos"
import TodosPedidos from "./components/pedidos/TodosPedidos"
import EditarPrato from "./components/editar/EditarPrato"
import EditarPedido from "./components/editar/EditarPedido"

import RotaProtegida from "./components/RotaProtegida"

function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/cadastro" element={ <Cadastro /> } />

      <Route path="/home" element={ <> <RotaProtegida><Home /></RotaProtegida> </>  } />

      <Route path="/novo-prato" element={ <RotaProtegida><NovoPrato /></RotaProtegida> } />
      <Route path="/novo-pedido" element={ <RotaProtegida><NovoPedido /></RotaProtegida> } />

      <Route path="/pratos" element={ <RotaProtegida><TodosPratos /></RotaProtegida> } />
      <Route path="/pedidos" element={ <RotaProtegida><TodosPedidos /></RotaProtegida> } />

      <Route path="/editar-prato/:id" element={ <RotaProtegida><EditarPrato /></RotaProtegida> } />
      <Route path="/editar-pedido/:id" element={ <RotaProtegida><EditarPedido /></RotaProtegida> } />
    </Routes>
  )
}

export default RouterApp