import ModelUsuario from "../models/Usuario.js"
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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
      email: request.body.email
    })
    if(verificar) {
      const checarSenha = await bcrypt.compare(request.body.senha, verificar.senha)
      if(checarSenha) {
        const token = jwt.sign({nome: verificar.nome}, process.env.SENHA_JWT)
        return response.json({"Mensagem": "Senha correta!", token: token})
      } else {
        return response.json({"Erro": "As informações não estão batendo!"})
      }
 
    } else {
      return response.json({"Erro": "Os dados não conferem!"})
    }
  } catch {
    response.json({"Erro": "Erro ao logar!"})
  }
}

export async function protegida(request, response) {
  response.send("<h1>Rota protegida!</h1>")
}