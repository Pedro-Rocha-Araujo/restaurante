import ModelPedido from "../models/Pedido.js"

export async function getPedidos(request, response) {
  try {
    const query = await ModelPedido.find()
    response.status(200).json(query)
  } catch {
    response.status(500).json({Erro: "Erro ao buscar os pedidos!"})
  }
}

export async function getPedido(request, response) {
  try {
    const query = await ModelPedido.findById(request.params.id)
    response.status(200).json(query)
  } catch {
    response.status(500).json({Erro: "Erro ao buscar o pedido!"})
  }
}

export async function cadastrarPedido(request, response) {
  const { status, mesa, lista, valor } = request.body
  try {
    const query = await ModelPedido.insertOne({
      status: status,
      mesa: mesa,
      lista: lista,
      valor: Number(valor)
    })
    response.status(201).json(query)
  } catch {
    response.status(500).json({Erro: "Erro ao cadastrar o pedido!"})
  }
}

export async function editarPedido(request, response) {
  try {
    const { id } = request.params
    const { status, mesa, lista, valor } = request.body

    const query = await ModelPedido.findByIdAndUpdate({_id: id}, {
      status: status,
      mesa: mesa,
      lista: lista,
      valor: valor
    })
    return response.json({Mensagem: "Pedido editado om sucesso!"})
  } catch {
    return response.json({Erro: "Erro ao editar o pedido!"})
  }
}

export async function deletarPedido(request, response) {
  try {
    const { id } = request.params
    const query = await ModelPedido.findByIdAndDelete(id)
    return response.status(200).json({Mensagem: "Pedido deletado com sucesso!"})
  } catch { 
    return response.status(500).json({Erro: "Erro ao deletar o pedido!"})
  }
}