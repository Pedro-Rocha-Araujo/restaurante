import ModelUsuario from "../models/Usuario.js"

export async function cadastrarUsuario(request, response) {
  try{
    const { nome, email, senha } = request.body
    const verificar = await ModelUsuario.findOne({email: request.body.email})
    if(!verificar){
      const query = await ModelUsuario.insertOne({
        nome: nome,
        email: email,
        senha: senha
      })
      return response.json(query)
    } else {
      return response.json({"Erro": "Usuário já tem um cadastro!"})
    }
  } catch {
    return response.json({"Erro": "Erro ao cadastrar Usuário!"})
  }
}

export async function logarUsuario(request, response) {
  try {
    const verificar = await ModelUsuario.findOne({
      email: request.body.email, 
      senha: request.body.senha
    })
    if(verificar) {
      
    } else {
      return response.json({"Erro": "Usuário não encontrado!"})
    }
  } catch {
    response.json({"Erro": "Erro ao logar!"})
  }
}