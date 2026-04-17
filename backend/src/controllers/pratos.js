import ModelPrato from "../models/Prato.js"

export async function getPratos(request, response) {
  try {
    const query = await ModelPrato.find({})
    return response.status(200).json(query)
  } catch {
    return response.status(500).json({Erro: "Erro ao pegar os pratos!"})
  }
}

export async function getPrato(request, response) {
  try {
    const query = await ModelPrato.findById(request.params.id)
    return response.status(200).json(query)
  } catch {
    return response.status(500).json({Erro: "Erro ao buscar o prato requisitado!"})
  }
}

export async function cadastrarPrato(request, response) {
  const { foto, nome, descricao, preco } = request.body
  try {
    const query = await ModelPrato.insertOne({
      foto: foto,
      nome: nome,
      descricao: descricao,
      preco: preco
    })
    return response.status(201).json(query)
  } catch {
    return response.status(500).json({Erro: "Erro ao cadastrar prato!"})
  }
}

export async function editarPrato(request, response) {
  const { foto, nome, descricao, preco } = request.body
  try {
    const query = await ModelPrato.findByIdAndUpdate({_id: request.params.id}, {
      foto: foto,
      nome: nome,
      descricao: descricao,
      preco: preco
    })
    return response.status(200).json({Mensagem: "Prato editado com sucesso"})
  } catch {
    return response.status(500).json({Erro: "Erro ao editar prato!"})
  }
}

export async function deletarPrato(request, response) {
  try {
    const query = await ModelPrato.findByIdAndDelete(request.params.id)
    return response.status(200).json({Mensagem: "Prato deletado com sucesso!"})
  } catch {
    return response.status(500).json({Erro: "Erro ao deletar prato!"})
  }
}