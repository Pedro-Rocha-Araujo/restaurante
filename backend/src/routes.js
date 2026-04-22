import { Router } from "express"

// imports das funções de CRUD
import { 
  cadastrarUsuario, 
  logarUsuario 
} from "./controllers/usuarios.js"
import { 
  getPratos, 
  getPrato, 
  cadastrarPrato, 
  editarPrato, 
  deletarPrato 
} from "./controllers/pratos.js"
import { 
  getPedidos, 
  getPedido, 
  cadastrarPedido, 
  editarPedido, 
  deletarPedido 
} from "./controllers/pedidos.js"
// import dos middlewares
import { checarLogin, checarCampos } from "./middlewares/middlewareUsuario.js"
import { checarIdPrato, checarCamposPrato } from "./middlewares/middlewarePrato.js"
import { checarIdPedido, checarCamposPedido } from "./middlewares/middlewarePedido.js"

const router = Router()

// Rotas de cadastro e de login
router.post("/cadastro", checarCampos, cadastrarUsuario)
router.post("/entrar", checarCampos, logarUsuario)
// Rotas de CRUD relacionadas aos pratos
router.get("/pratos", getPratos)
router.get("/prato/:id", checarIdPrato, getPrato)
router.post("/cadastrar-prato", checarCamposPrato, cadastrarPrato)
router.put("/editar-prato/:id", checarIdPrato, checarCamposPrato, editarPrato)
router.delete("/deletar-prato/:id", checarIdPrato, deletarPrato)
// Rotas de CRUD relacinadas aos pedidos
router.get("/pedidos", getPedidos)
router.get("/pedido/:id", checarIdPedido, getPedido)
router.post("/cadastrar-pedido", checarCamposPedido, cadastrarPedido)
router.put("/editar-pedido/:id", checarIdPedido, checarCamposPedido, editarPedido)
router.delete("/deletar-pedido/:id", checarIdPedido, deletarPedido)

export default router