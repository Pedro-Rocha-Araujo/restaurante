import { Router } from "express"
import { cadastrarUsuario, logarUsuario, protegida } from "./controllers/usuarios.js"
import { checarLogin } from "./middlewares/middlewareUsuario.js"

const router = Router()

router.post("/cadastro", cadastrarUsuario)
router.post("/entrar", logarUsuario)
router.get("/protegida", checarLogin, protegida)

export default router