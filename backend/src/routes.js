import { Router } from "express"
import { cadastrarUsuario, logarUsuario, protegida } from "./controllers/usuarios.js"
import { checarLogin, checarCampos } from "./middlewares/middlewareUsuario.js"

const router = Router()

router.post("/cadastro", checarCampos, cadastrarUsuario)
router.post("/entrar", checarCampos, logarUsuario)
router.get("/protegida", checarLogin, protegida)

export default router