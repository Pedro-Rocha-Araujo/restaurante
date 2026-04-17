import ModelUsuario from "../models/Usuario.js"
import "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function cadastrarUsuario(request, response) {
  try{
    const salt = await bcrypt.genSalt(12)
    const { nome, email, senha } = request.body
    if(!nome) {
      return response.status(400).json({erro: "Todos os campos são obrigatórios!"})
    }
    const verificar = await ModelUsuario.findOne({email: email})
    if(!verificar) {
      const query = await ModelUsuario.insertOne({
        nome: nome,
        email: email,
        senha: await bcrypt.hash(senha, salt)
      })
      
      const token = jwt.sign({id: query.id}, process.env.SENHA_JWT, {expiresIn: "1d"})
      return response.status(201).json({query: query, token: token})
    } else {
      return response.status(409).json({"Erro": "Usuário já tem um cadastro!"})
    }
  } catch {
    return response.status(500).json({"Erro": "Erro ao cadastrar Usuário!"})
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
        const token = jwt.sign({id: verificar.id}, process.env.SENHA_JWT, {expiresIn: "1d"})
        return response.status(200).json({"Mensagem": "Senha correta!", token: token})
      } else {
        return response.status(401).json({"Erro": "Email e ou senha inválidos!"})
      }
    } else {
      return response.status(401).json({"Erro": "Email e ou senha inválidos!"})
    }
  } catch {
    return response.status(500).json({"Erro": "Erro ao logar!"})
  }
}