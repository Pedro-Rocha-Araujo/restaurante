import ModelUsuario from "../models/Usuario.js"
import bcrypt from "bcrypt"


export async function cadastrarUsuario(request, response) {
  try{
    const salt = await bcrypt.genSalt(12)
    const { nome, email, senha } = request.body
    const verificar = await ModelUsuario.findOne({email: request.body.email})
    if(!verificar){
      const query = await ModelUsuario.insertOne({
        nome: nome,
        email: email,
        senha: await bcrypt.hash(senha, salt)
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
      return response.json({"Erro": "Os dados não conferem!"})
    }
  } catch {
    response.json({"Erro": "Erro ao logar!"})
  }
}