import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./card.css"

function Card({ itemCard, setItemCard }) {
  const navigate = useNavigate()

  function removerCard() {
    setItemCard(null)
  }

  async function deletarPedido(id) {
    try {
      await axios.delete("http://localhost:4000/deletar-pedido/"+id)
      setItemCard(null)
      toast.success("Pedido deletado!")
    } catch {
      toast.error("Erro ao deletar o pedido!")
    }
  }
  async function atualizarPedido(id) {
    navigate("/editar-pedido/"+id)
  }

  return (
    <div className="background">
      <div className="card">
          <div className="infos">

            <div className="titulo">
              <h2>Mesa {itemCard.mesa}</h2>
              <div className="botoes">
                <i onClick={()=>deletarPedido(itemCard._id)} className="fa-solid fa-trash fa-lg"></i>
                <i onClick={()=>atualizarPedido(itemCard._id)} className="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
            <div className="pratos-card">
              {itemCard.lista.map((prato)=>{
                return (
                  <div key={prato._id} className="prato" id="pequeno">
                    <img 
                      src={prato.foto} 
                      alt={`Imagem do prato ${prato.nome}`}
                    />
                    <h3>{prato.nome}</h3>
                  </div>
                )
              })}
            </div>

            <span className="valor">Total a pagar: R$ {itemCard.valor},00</span>
          </div>
        <button className="card" onClick={removerCard}>Fechar</button>
      </div>
    </div>
  )
}

export default Card