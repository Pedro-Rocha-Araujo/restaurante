import { Schema, model } from "mongoose"

const SchemaUsuario = new Schema({
  nome: String,
  email: String,
  senha: String
}) 

const ModelUsuario = model("usuarios", SchemaUsuario)

export default ModelUsuario