import { Router } from "express"
import { cadastrarUsuario, logarUsuario } from "./controllers/usuarios.js"
import { checarLogin, checarCampos } from "./middlewares/middlewareUsuario.js"
import { getPratos, getPrato, cadastrarPrato, editarPrato, deletarPrato } from "./controllers/pratos.js"

const router = Router()


// Rotas de cadastro e de login
router.post("/cadastro", checarCampos, cadastrarUsuario)
router.post("/entrar", checarCampos, logarUsuario)
// Rotas de CRUD relacionadas à os pratos
router.get("/pratos", getPratos)
router.get("/prato/:id", getPrato)
router.post("/cadastrar-prato", cadastrarPrato)
router.put("/editar-prato/:id", editarPrato)
router.delete("/deletar-prato/:id", deletarPrato)

export default router