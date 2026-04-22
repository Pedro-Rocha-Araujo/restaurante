import { useState, useEffect } from "react"
import CardPedido from "./card/CardPedido"
import axios from "axios"
import { Link } from "react-router-dom"

function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  useEffect(()=>{
    async function getPedidos() {
      const response = await axios.get("http://localhost:4000/pedidos")
      setPedidos([response.data[0], response.data[1]])
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

          {pedidos.map((pedido, index)=>{
            return (
              <div key={index} className="pedido">
                <div className="footer">
                  <h3>Mesa {pedido.mesa}</h3>
                  <i onClick={()=>setItemCard(pedido)} className="fa-solid fa-eye fa-lg"></i>
                </div>
              </div>
            )
          })}


          <div className="pedido add">
            <div className="footer">
              <h3><Link to="/novo-pedido">Adicionar pedido</Link></h3>
              <Link to="/novo-pedido"><i className="fa-solid fa-circle-plus fa-lg"></i></Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Pedidos