import jwt from "jsonwebtoken"
import "dotenv/config"


export async function checarLogin(request, response, next) {
  const informacaoToken = request.headers["authorization"]
  if(!informacaoToken) {
    return response.json({erro: "Usuário precisa estar logado para acessar essa rota!"})
  }
  const token = informacaoToken.split(" ")[1]
    if(!token) {
    return response.json({erro: "Token inválido!"})
  }
  jwt.verify(token, process.env.SENHA_JWT, (erro, usuario)=>{
    if(erro){
      response.json({erro: "Erro ao verificar o token!"})
    }
    request.user = usuario
    next()
  })
}