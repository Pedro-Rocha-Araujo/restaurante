import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./src/routes/routes.js"

import "dotenv/config"

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.URL_MONGO)
    console.log("Banco conectado com sucesso!")
    app.listen(4000, () => {
      console.log("Servidor rodando!")
    })
  } catch(erro) {
    console.log(erro)
    console.log("Erro ao conectar o banco!")
  }
}

iniciarServidor()