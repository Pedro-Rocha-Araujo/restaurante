import Header from "../Header"
import Card from "../home/card/Card"
import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./pratos.css"

function TodosPratos() {
  const [pratos, setPratos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  const navigate = useNavigate()

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
  }, [pratos, itemCard])

  async function setarId(id) {
    try{
      const response = await axios.get("http://localhost:4000/prato/"+id)
      setItemCard(response.data)
    } catch {
      toast.error("Erro ao buscar o prato!")
    }
  }

  return (
    <>  
      {itemCard && (
        <Card itemCard={itemCard} setItemCard={setItemCard} />
      )}

      <Header titulo="Pratos" emoji={<i className="fa-solid fa-utensils"></i>} />

      <section className="pratos">
        <h2> <i className="fa-solid fa-utensils"></i> Pratos Disponíveis</h2>
        <div className="todos-pratos">
          {pratos.map((prato)=>{
            return (
              <div onClick={()=>setarId(prato._id)} key={prato._id} className="prato">
                  <img 
                    src={prato.foto} 
                    alt={`Imagem do prato ${prato.nome}`}
                  />
                  <div className="footer">
                    <h3>{prato.nome}</h3>
                      <i className="fa-solid fa-eye fa-lg"></i>
                  </div>
              </div>
            )
          })}
          <div onClick={()=>navigate("/novo-prato")} className="prato add">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg" 
              alt={`Imagem com um símbolo de mais, simbolizando adicioanr um novo prato ao cardápio`}
            />
            <div className="footer">
              <h3>Novo prato</h3>
              <i className="fa-solid fa-circle-plus fa-lg"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TodosPratos