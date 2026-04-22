import Header from "../Header" 
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import "./novo.css"

function NovoPedido() {
  const [mesa, setMesa] = useState()
  const [pratos, setPratos] = useState([])
  const [pratoSelecionado, setPratoSelecionado] = useState()
  const [lista, setLista] = useState([])
  const [valor, setValor] = useState(0)

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

  useEffect(()=> {
    function calcularValor() {
      let valorTotal = 0
      lista.map((item, index)=>{
        valorTotal = valorTotal + item.preco
      })
      setValor(valorTotal)
    }
    calcularValor()
  }, [lista])
  
  useEffect(()=>{
    async function getPratos() {
      const response = await axios.get("http://localhost:4000/pratos")
      setPratos(response.data)
    }
    getPratos()
  }, [])

  async function cadastrarPedido(e) {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/cadastrar-pedido", {
        status: true,
        mesa: mesa,
        lista: lista,
        valor: valor
      })
      setLista([])
      setMesa("")
      toast.success("Pedido cadastrado com sucesso!")
    } catch {
      toast.error("Erro ao cadastrar o pedido")
    }
  }

  return (
    <>
      <Header titulo="Novo pedido" emoji={<i className="fa-solid fa-circle-plus"></i>} /> 
      <section className="novo-prato">
        <h2>Formulário</h2>
        <form className="novo-prato" onSubmit={cadastrarPedido} >
            <input 
              type="number" 
              value={mesa} 
              placeholder="Número da mesa" 
              required
              onChange={(e)=>setMesa(e.target.value)}
              />
            <select required name="prato" onChange={handlePrato}>
              {pratos.map((prato, index)=>{
                return (
                  <option key={index} value={prato._id}>{prato.nome} - R${prato.preco}</option>
                )
              })}
            </select>
            <button onClick={adicionarLista} type="button">Adicionar</button>
            <h3 className="titulo-valor">Valor atual: R${valor}</h3>
            <div className="pratos pequenos">
              {lista.map((prato, index)=>{
                return (
                  <div key={index} className="prato" id="pequeno">
                    <img src={prato.foto} />
                    <div className="informacoes">
                      <h3>{prato.nome}</h3>
                      <i onClick={()=>removerLista(prato._id)} className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                )
              })}
            </div>
            <button type="submit">Finalizar</button>
        </form>
      </section>
    </>
  )
}

export default NovoPedido