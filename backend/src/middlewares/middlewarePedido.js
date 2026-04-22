import ModelPedido from "../models/Pedido.js"

export async function checarIdPedido(request, response, next) {
  try { 
    const { id } = request.params
    const checagem = await ModelPedido.findById(id)
    if(!checagem || checagem === undefined) {
      return response.status(400).json({Erro: "Id não encontrado!"})
    }
    next()
  } catch {
    return response.status(500).json({Erro: "Id não encontrado!"})
  }
}

export async function checarCamposPedido(request, response, next) {
  try {
    const { status, mesa, lista, valor } = request.body
    if(!status || !mesa || !valor) {
      return response.status(400).json({Erro: "Campos não preenchidos!"})
    }
    if(lista.length <= 0) {
      return response.status(400).json({Erro: "Campos não preenchidos!"})
    }
    next()
  } catch {
    return response.status(500).json({Erro: "Campos não processados!"})
  }
}