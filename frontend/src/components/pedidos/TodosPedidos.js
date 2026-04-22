import Header from "../Header"
import CardPedido from "../home/card/CardPedido"
import { Link } from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"
import { useState, useEffect } from "react"

function TodosPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  useEffect(()=>{
    async function getPedidos() {
      const response = await axios.get("http://localhost:4000/pedidos")
      setPedidos(response.data)
    }
    getPedidos()
  }, [itemCard, setItemCard])

  return (
    <>  
    {itemCard && (
      <CardPedido itemCard={itemCard} setItemCard={setItemCard} />
    )}
    <Header titulo="Pedidos" emoji={<i className="fa-solid fa-clipboard"></i>} />
    <section className="pedidos" >
      <h2>Pedidos</h2>
      <div className="pedidos todos">
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

export default TodosPedidos