import { useState } from "react"
import { Link } from "react-router-dom"
import "./cadastro.css"

function Cadastro() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: ""
  })

  function handleChange(e) {
    const { name, value } = e.target
    setUsuario((prevValue)=>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  function salvarUsuario(e) {
    e.preventDefault()
    alert(`${usuario.nome} Cadastrado com sucesso!`)
    setUsuario({
      nome: "",
      email: "",
      senha: ""
    })
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
        <p>Já possui uma conta? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Cadastro