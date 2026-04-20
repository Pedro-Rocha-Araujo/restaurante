import { Router } from "express"
// imports das funções de CRUD
import { cadastrarUsuario, logarUsuario } from "./controllers/usuarios.js"
import { getPratos, getPrato, cadastrarPrato, editarPrato, deletarPrato } from "./controllers/pratos.js"
import { getPedidos, getPedido, cadastrarPedido, deletarPedido } from "./controllers/pedidos.js"
// import dos middlewares
import { checarLogin, checarCampos } from "./middlewares/middlewareUsuario.js"

const router = Router()

// Rotas de cadastro e de login
router.post("/cadastro", checarCampos, cadastrarUsuario)
router.post("/entrar", checarCampos, logarUsuario)
// Rotas de CRUD relacionadas aos pratos
router.get("/pratos", getPratos)
router.get("/prato/:id", getPrato)
router.post("/cadastrar-prato", cadastrarPrato)
router.put("/editar-prato/:id", editarPrato)
router.delete("/deletar-prato/:id", deletarPrato)
// Rotas de CRUD relacinadas aos pedidos
router.get("/pedidos", getPedidos)
router.get("/pedido/:id", getPedido)
router.post("/cadastrar-pedido", cadastrarPedido)
router.delete("/deletar-pedido/:id", deletarPedido)

export default router