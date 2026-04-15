import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./login.css"

function Login() {
  const [usuario, setUsuario] = useState({
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

  async function logar(e) {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/entrar", {
        email: usuario.email,
        senha: usuario.senha
      })
      navigate("/home")
      setUsuario({
        email: "",
        senha: ""
      })
    } catch {
      alert("Erro ao logar o usuário!")
    }
  }

  return (
    <div className="login">
      <div className="container">
        <section className="login">
          <div className="header-login">
            <h1>Logar-se</h1>
          </div>
          <form onSubmit={logar} className="form-login">
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
            <button>Logar</button>
          </form>
        </section>
        <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </div>
    </div>
  )
}

export default Login