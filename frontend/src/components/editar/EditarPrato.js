import Header from "../Header" 
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function NovoPrato() {
  const [prato, setPrato] = useState({
    foto: "",
    nome: "",
    preco: "",
    descricao: ""
  })
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    async function getPrato() {
      try {
        const response = await axios.get("http://localhost:4000/prato/"+id)
        console.log(response.data)
        setPrato({
          foto: response.data.foto,
          nome: response.data.nome,
          preco: response.data.preco,
          descricao: response.data.descricao
        })
      } catch {
        console.log("Erro ao buscar o prato!")
      }
    }
    getPrato()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setPrato((prevValue)=>{
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  async function editarPrato(e) {
    e.preventDefault()
    try {
      const response = await axios.put("http://localhost:4000/editar-prato/"+id, {
        foto: prato.url,
        nome: prato.nome,
        preco: prato.preco,
        descricao: prato.descricao
      })
      navigate("/home")
      toast.success("Prato editado com sucesso!")
    } catch {
      toast.error("Erro ao editar o prato!")
    } 
  }

  return (
    <>
      <Header titulo="Edição" emoji={<i class="fa-solid fa-pen-to-square"></i>} /> 
      <section className="novo-prato">
        <h2>Editar prato</h2>
        <form className="novo-prato" onSubmit={editarPrato} >
            <input 
              type="text" 
              placeholder="URL da imagem" 
              onChange={handleChange}
              value={prato.foto}
              name="url"
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
            <button>Salvar</button>
        </form>
      </section>
    </>
  )
}

export default NovoPrato