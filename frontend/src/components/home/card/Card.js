import axios from "axios"
import { toast } from "react-toastify"
import "./card.css"
import { useNavigate } from "react-router-dom"

function Card ({ itemCard, setItemCard }) {
  function removerCard(itemCard) {
    setItemCard(null)
  }
  const navigate = useNavigate()
  async function deletarPrato(id) {
    try {
      console.log(id)
      const response = await axios.delete("http://localhost:4000/deletar-prato/"+itemCard._id)
      setItemCard(null)
      toast.success("Prato deletado com sucesso!")
    } catch {
      toast.error("Erro ao deletar o prato!")
    }
  }
  async function atualizarPrato(id) {
    navigate("/editar-prato/"+id)
  }

  return (
    <div className="background">
      <div className="card">
        <img src={itemCard.foto} />
        <div className="infos">
          <div className="titulo">
            <h2>{itemCard.nome}</h2>
            <div className="botoes">
              <i onClick={()=>deletarPrato(itemCard._id)} class="fa-solid fa-trash fa-lg"></i>
              <i onClick={()=>atualizarPrato(itemCard._id)} class="fa-solid fa-pen-to-square fa-lg"></i>
            </div>
          </div>
          <p>{itemCard.descricao}</p>
          <span>R$ {itemCard.preco},00</span>
        </div>
        <button onClick={removerCard}>Fechar</button>
      </div>
    </div>
  )
}

export default Card