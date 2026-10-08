import Header from "../Header"
import CardPedido from "../home/card/CardPedido"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TodosPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  const navigate = useNavigate()

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
      <h2> <i className="fa-solid fa-clipboard"></i> Pedidos</h2>
      <div className="pedidos todos">
        {pedidos.map((pedido, index)=>{
          return (
            <div onClick={()=>setItemCard(pedido)} key={index} className="pedido">
                <div className="footer">
                  <h3>Mesa {pedido.mesa}</h3>
                    <i className="fa-solid fa-eye fa-lg"></i>
                </div>
            </div>
          )
        })}
        <div className="pedido add">
          <div className="footer">
            <h3 onClick={()=>navigate("/novo-pedido")}>Adicionar pedido</h3>
            <i className="fa-solid fa-circle-plus fa-lg"></i>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default TodosPedidos