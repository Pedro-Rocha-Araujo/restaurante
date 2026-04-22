import ModelPrato from "../models/Prato.js"

export async function checarIdPrato(request, response, next) {
  try {
    const { id } = request.params
    const checagem = await ModelPrato.findById(id)
    if(!checagem || id === undefined) {
      return response.status(404).json({Erro: "Id do prato não encontrado!"})
    }
    next()
  } catch {
    return response.status(500).json("O prato não foi encontrado!")
  }
}

export async function checarCamposPrato(request, response, next) {
  try {
    const { foto, nome, preco, descricao } = request.body
    if(!foto?.trim() || !nome?.trim() || preco === undefined || !descricao?.trim()) {
      return response.status(400).json({Erro: "Campos não preenchidos!"})
    }
    if(preco <= 0){
      return response.status(400).json({Erro: "O campo preço precisa estar devidamente preenchido!"})
    }
    next()
  } catch {
    return response.status(500).json({Erro: "Campos não validados!"})
  }
}