import { Schema, model } from "mongoose"

const SchemaPrato = Schema({
  foto: String,
  nome: String,
  descricao: String,
  preco: Number
})

const ModelPrato = model("pratos", SchemaPrato)

export default ModelPrato