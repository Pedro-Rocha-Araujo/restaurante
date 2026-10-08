import { useState, useEffect } from "react"
import CardPedido from "./card/CardPedido"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    async function getPedidos() {
      const response = await axios.get("http://localhost:4000/pedidos")
      const array = response.data
      setPedidos(array.filter((_,i)=> {
        return i < 2
      }))
    }
    getPedidos()
  }, [])

  return (
    <>
      { itemCard && (
        <CardPedido itemCard={itemCard} setItemCard={setItemCard} />
      )}
      <section className="pedidos">
        <h2><Link to="/pedidos">Pedidos <i className="fa-solid fa-clipboard"></i></Link></h2>
        <div className="pedidos">

          {pedidos.map((pedido)=>{
            return (
              <div onClick={()=>setItemCard(pedido)} key={pedido._id} className="pedido">
                <div className="footer">
                  <h3>Mesa {pedido.mesa}</h3>
                  <i className="fa-solid fa-eye fa-lg"></i>
                </div>
              </div>
            )
          })}


          <div onClick={()=>navigate("/novo-pedido")} className="pedido add">
            <div className="footer">
              <h3>Novo pedido</h3>
              <i className="fa-solid fa-circle-plus fa-lg"></i>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Pedidos