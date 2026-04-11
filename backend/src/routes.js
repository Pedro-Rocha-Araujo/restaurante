import { Router } from "express"
import { cadastrarUsuario, logarUsuario } from "./controllers/usuarios.js"

const router = Router()

router.post("/cadastro", cadastrarUsuario)
router.post("/entrar", logarUsuario)

export default router