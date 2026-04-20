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
  const { mesa, lista } = request.body
  let valor = 0
  lista.forEach((item)=>{
    valor += item.preco
  })
  try {
    const query = await ModelPedido.insertOne({
      mesa: mesa,
      lista: lista,
      valor: valor
    })
    response.status(201).json(query)
  } catch {
    response.status(500).json({Erro: "Erro ao cadastrar o pedido!"})
  }
}

export default function deletarPedido(request, response) {
  try {
    const { id } = request.params
    const query = ModelPedido.findByIdAndDelete(id)
    response.status(200).json({Mensagem: "Pedido deletado com sucesso!"})
  } catch {
    response.status(500).json({Erro: "Erro ao deletar o pedido!"})
  }
}