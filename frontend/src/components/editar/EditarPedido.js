import Header from "../Header" 
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function NovoPedido() {
  const [mesa, setMesa] = useState()
  const [pratos, setPratos] = useState([])
  const [pratoSelecionado, setPratoSelecionado] = useState()
  const [lista, setLista] = useState([])
  const [valor, setValor] = useState(0)

  const { id } = useParams()
  const navigate = useNavigate()

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
    async function pegarInformacoes() {
      const response = await axios.get("http://localhost:4000/pedido/"+id)
      setMesa(response.data.mesa)
      setLista(response.data.lista)
      setValor(response.data.valor)
    }
    pegarInformacoes()
  }, [id])

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

  async function editarPedido(e) {
    e.preventDefault()
    try {
      const response = await axios.put("http://localhost:4000/editar-pedido/"+id, {
        status: true,
        mesa: mesa,
        lista: lista,
        valor: valor
      })
      toast.success("Pedido editado com sucesso!")
      navigate("/pedidos")
    } catch {
      toast.error("Erro ao editar o pedido")
    }
  }

  return (
    <>
      <Header titulo="Editar pedido" emoji={<i class="fa-solid fa-circle-plus"></i>} /> 
      <section className="novo-prato">
        <h2>Formulário</h2>
        <form className="novo-prato" onSubmit={editarPedido} >
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
                  <div className="prato" id="pequeno">
                    <img src={prato.foto} />
                    <div className="informacoes">
                      <h3>{prato.nome}</h3>
                      <i onClick={()=>removerLista(prato._id)} class="fa-solid fa-trash"></i>
                    </div>
                  </div>
                )
              })}
            </div>
            <button type="submit">Editar</button>
        </form>
      </section>
    </>
  )
}

export default NovoPedido