import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./cadastro.css"

function Cadastro() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
  })
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setUsuario((prevValue)=>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  async function salvarUsuario(e) {
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:4000/cadastro", {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      })
      navigate("/home")
      setUsuario({
        nome: "",
        email: "",
        senha: ""
      })
    } catch {
      alert("Erro ao cadastrar Usuário")
    }
  }

  return (
    <div className="cadastro">
      <div className="container">
        <section className="cadastro">
          <div className="header-cadastro">
            <h1>Cadastrar-se</h1>
          </div>
          <form onSubmit={salvarUsuario} className="form-cadastro">
            <input 
              type="text" 
              name="nome" 
              required 
              placeholder="Nome completo" 
              value={usuario.nome}
              onChange={handleChange}
            />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Endereço de E-mail"
              value={usuario.email}
              onChange={handleChange}
            />
            <input 
              type="password" 
              name="senha" 
              required 
              placeholder="Senha"
              value={usuario.senha}
              onChange={handleChange}
            />
            <button>Cadastrar</button>
          </form>
        </section>
        <p>Já possui uma conta? <Link to="/">Login</Link></p>
      </div>
    </div>
  )
}

export default Cadastro