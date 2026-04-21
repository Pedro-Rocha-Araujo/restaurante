import Header from "../Header"
import Card from "../home/card/Card"
import axios from "axios"
import {toast} from "react-toastify"
import { useState, useEffect } from "react"

function TodosPedidos() {
  const [pedidos, setPedidos] = useState([])
  console.log(pedidos)
  useEffect(()=>{
    async function getPedidos() {
      const response = await axios.get("http://localhost:4000/pedidos")
      setPedidos(response.data)
    }
    getPedidos()
  }, [])

  return (
    <>  
    <Header titulo="Pedidos" emoji={<i className="fa-solid fa-clipboard"></i>} />
    <section className="pedidos">
      <h2>Pedidos!</h2>
      <div className="pedidos">
        {pedidos.map((pedido, index)=>{
          return (
            <div className="pedido">
                <div className="footer">
                  <h3>Mesa {pedido.mesa}</h3>
                    <i className="fa-solid fa-eye fa-lg"></i>
                </div>
            </div>
          )
        })}
      </div>
    </section>
    </>
  )
}

export default TodosPedidos