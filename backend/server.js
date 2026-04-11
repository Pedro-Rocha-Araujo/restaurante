import express from "express"
import { connect } from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"

import router from "./src/routes.js"
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

async function conectarBanco() {
  try {
    connect(process.env.URL_MONGO)
    console.log("Banco conectado com sucesso!")
  } catch {
    console.log("Erro ao conectar o banco!")
  }
}
conectarBanco()

app.listen(4000, ()=>console.log("Servidor rodando!"))