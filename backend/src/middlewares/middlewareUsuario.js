import jwt from "jsonwebtoken"
import "dotenv/config"


export async function checarLogin(request, response, next) {
  const informacaoToken = request.headers["authorization"]
  if(!informacaoToken) {
    return response.status(401).json({erro: "Usuário precisa estar logado para acessar essa rota!"})
  }
  const token = informacaoToken.split(" ")[1]
    if(!token) {
    return response.status(401).json({erro: "Token inválido!"})
  }
  jwt.verify(token, process.env.SENHA_JWT, (erro, usuario)=>{
    if(erro){
      response.status(500).json({erro: "Erro ao verificar o token!"})
    }
    request.user = usuario
    next()
  })
}

export function checarCampos(request, response, next) {
  const {email, senha} = request.body
  if(!email, !senha) {
    return response.json({Erro: "Os campos são obrigatórios!"})
  }
  next()
}