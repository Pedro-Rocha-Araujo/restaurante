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

  function adicionarLista() {
    if(!pratoSelecionado) {
      toast.error("Selecione um item!")
      return
    }
    const encontrarPrato = pratos.find(prato => prato._id === pratoSelecionado)
    setLista((prevValue)=>{
      return [...prevValue, encontrarPrato]
    })
  }

  function removerLista(index) {
    const listaAtualizada = lista.filter((_, i)=> {
      return i !== index
    })
    setLista(listaAtualizada)
    console.log(listaAtualizada)
  }

  useEffect(()=> {
    function calcularValor() {
      const valorTotal = lista.reduce((acumulador, atual)=> {
        return acumulador + atual.preco
      }, 0)
      setValor(valorTotal)
    }
    calcularValor()
  }, [lista])
  
  useEffect(()=>{
    async function getPratos() {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:4000/pratos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPratos(response.data)
    }
    getPratos()
  }, [])

  async function cadastrarPedido(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:4000/cadastrar-pedido", {
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
      <section className="formulario">
        <h2>Formulário</h2>

        <form onSubmit={cadastrarPedido} >

            <input 
              type="number" 
              value={mesa} 
              placeholder="Número da mesa" 
              required
              onChange={(e)=>setMesa(e.target.value)}
            />

            <select required name="prato" value={pratoSelecionado} onChange={(e)=> setPratoSelecionado(e.target.value)}>
              <option disabled selected>Selecione o prato</option>
              {pratos.map((prato)=>{
                return (
                  <option key={prato._id} value={prato._id}> {prato.nome} - R${prato.preco} </option>
                )
              })}
            </select>
            <button onClick={adicionarLista} type="button">Adicionar</button>

            <h3 className="titulo-valor">Valor atual: R${valor}</h3>
            
            <div className="pratos-pequenos">
              {lista.map((prato, index)=>{
                return (
                  <div key={prato._id} className="prato" id="pequeno">
                    <i onClick={()=> removerLista(index)} className="fa-solid fa-trash"></i>
                    <img 
                      src={prato.foto} 
                      alt={`Foto do prato ${prato.nome}`}
                    />
                    <h3>{prato.nome}</h3>
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