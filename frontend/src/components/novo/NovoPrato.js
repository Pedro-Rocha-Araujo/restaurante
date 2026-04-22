import Header from "../Header" 
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import "./novo.css"

function NovoPrato() {
  const [prato, setPrato] = useState({
    foto: "",
    nome: "",
    preco: "",
    descricao: ""
  })

  function handleChange(e) {
    const { name, value } = e.target
    setPrato((prevValue)=>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  async function cadastrarPrato(e) {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/cadastrar-prato", {
        foto: prato.foto,
        nome: prato.nome,
        preco: Number(prato.preco),
        descricao: prato.descricao
      })
      setPrato({
        foto: "",
        nome: "",
        preco: "",
        descricao: ""
      })
      toast.success("Prato cadastrado com sucesso!")
    } catch {
      toast.error("Erro ao cadastrar o prato!")
    } 
  }

  return (
    <>
      <Header titulo="Novo prato" emoji={<i class="fa-solid fa-circle-plus"></i>} /> 
      <section className="novo-prato">
        <h2>Formulário</h2>
        <form className="novo-prato" onSubmit={cadastrarPrato} >
            <input 
              type="text" 
              placeholder="URL da imagem" 
              onChange={handleChange}
              value={prato.foto}
              name="foto"
              required
            />
            <input 
              type="text" 
              placeholder="Nome do prato" 
              onChange={handleChange}
              value={prato.nome}
              name="nome"
              required
            />
            <input 
              type="number" 
              placeholder="Preço R$" 
              onChange={handleChange}
              value={prato.preco}
              name="preco"
              required
            />
            <textarea 
              placeholder="Descrição do prato" 
              required 
              value={prato.descricao}
              onChange={handleChange}
              name="descricao"
            />
            <button>Cadastrar</button>
        </form>
      </section>
    </>
  )
}

export default NovoPrato