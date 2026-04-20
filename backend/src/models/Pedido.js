import { Schema, model } from "mongoose"

const SchemaPedido = Schema({
  status: Boolean,
  mesa: String,
  lista: [],
  valor: Number
})

const ModelPedido = model("pedidos", SchemaPedido)

export default ModelPedido