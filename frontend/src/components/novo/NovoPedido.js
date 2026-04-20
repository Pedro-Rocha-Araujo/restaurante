import Header from "../Header" 
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import "./novo.css"

function NovoPedido() {
  const [pedido, setPedido] = useState({
    status: true,
    mesa: "",
    lista: [],
  })
  const [pratoSelecionado, setPratoSelecionado] = useState()
  const [lista, setLista] = useState([])
  const [pratos, setPratos] = useState([])

  function handlePrato(e) {
    setPratoSelecionado(e.target.value)
  }

  function adicionarLista(e) {
    const encontrarPrato = pratos.find(prato => prato._id === pratoSelecionado)
    setLista((prevValue)=>{
      return [...prevValue, encontrarPrato]
    })
  }

  function removerLista(id) {
    let novaLista = lista.filter((item)=>{
      return item._id !== id
    })
    setLista(novaLista)
  }
  
  useEffect(()=>{
    async function getPratos() {
      const response = await axios.get("http://localhost:4000/pratos")
      setPratos(response.data)
    }
    getPratos()
  }, [])

  return (
    <>
      <Header titulo="Novo pedido" emoji={<i class="fa-solid fa-circle-plus"></i>} /> 
      <section className="novo-prato">
        <h2>Formulário</h2>
        <form className="novo-prato" >
            <input type="number" placeholder="Número da mesa" required />
            <select required name="prato" onChange={handlePrato}>
              {pratos.map((prato, index)=>{
                return (
                  <option key={index} value={prato._id}>{prato.nome}</option>
                )
              })}
            </select>
            <button onClick={adicionarLista} type="button">Adicionar</button>
            <div className="pratos">
              {lista.map((prato, index)=>{
                return (
                  <div className="prato">
                    <img src={prato.foto} />
                    <div className="informacoes">
                      <h3>{prato.nome}</h3>
                      <i onClick={()=>removerLista(prato._id)} class="fa-solid fa-trash"></i>
                    </div>
                  </div>
                )
              })}
            </div>
            <button type="submit">Salvar</button>
        </form>
      </section>
    </>
  )
}

export default NovoPedido