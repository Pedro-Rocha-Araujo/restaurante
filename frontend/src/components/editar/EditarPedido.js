import Header from "../Header" 
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function NovoPedido() {
  const [mesa, setMesa] = useState()
  const [pratos, setPratos] = useState([])
  const [pratoSelecionado, setPratoSelecionado] = useState("")
  const [lista, setLista] = useState([])
  const [valor, setValor] = useState(0)

  const { id } = useParams()
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  function handlePrato(e) {
    setPratoSelecionado(e.target.value)
  }

  function adicionarLista() {
    const encontrarPrato = pratos.find(prato => prato._id === pratoSelecionado)
    setLista((prevValue)=>{
      return [...prevValue, encontrarPrato]
    })
  }

  function removerLista(index) {
    const array = lista.filter((_,i)=> {
      return i !== index
    })
    setLista(array)
  }

  useEffect(()=>{
    async function pegarInformacoes() {
      if(!token) {
        toast.error("Usuário não logado!")
        return
      }
      const response = await axios.get("http://localhost:4000/pedido/"+id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMesa(response.data.mesa)
      setLista(response.data.lista)
      setValor(response.data.valor)
    }
    pegarInformacoes()
  }, [id, token])

  useEffect(()=> {
    function calcularValor() {
      const valorTotal = lista.reduce((acumulador, atual)=>{
        return acumulador + atual.preco
      }, 0)
      setValor(valorTotal)
    }
    calcularValor()
  }, [lista])
  
  useEffect(()=>{
    async function getPratos() {
      const response = await axios.get("http://localhost:4000/pratos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPratos(response.data)
    }
    getPratos()
  }, [token])

  async function editarPedido(e) {
    e.preventDefault()
    try {
      await axios.put("http://localhost:4000/editar-pedido/"+id, {
        status: true,
        mesa: mesa,
        lista: lista,
        valor: valor
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      navigate("/pedidos")
    } catch {
      toast.error("Erro!")
    }
  }

  return (
    <>
      <Header titulo="Editar pedido" emoji={<i className="fa-solid fa-circle-plus"></i>} /> 
      
      <section className="novo-prato formulario">
        <h2>Formulário</h2>
        <form className="novo-prato" onSubmit={editarPedido} >

            <input 
              type="number" 
              value={mesa} 
              placeholder="Número da mesa" 
              required
              onChange={(e)=>setMesa(e.target.value)}
            />

            <select required name="prato" defaultValue={pratoSelecionado} onChange={handlePrato}>
             <option selected disabled value={""}>Selecione o prato</option>
              {pratos.map((prato)=>{
                return (
                  <option key={prato._id} value={prato._id}>{prato.nome} - R${prato.preco}</option>
                )
              })}
            </select>

            <button onClick={adicionarLista} type="button">Adicionar</button>

            <h3 className="titulo-valor">Valor atual: R${valor}</h3>
            <div className="pratos-pequenos">
              {lista.map((prato, index)=>{
                return (
                  <div key={prato._id} className="prato" id="pequeno">
                    <img 
                      src={prato.foto} 
                      alt={`Foto do prato ${prato.foto}`}
                     />
                    <div className="informacoes">
                      <h3>{prato.nome} - R$ {prato.preco}</h3>
                      <i onClick={ ()=>removerLista(index) } className="fa-solid fa-trash"></i>
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