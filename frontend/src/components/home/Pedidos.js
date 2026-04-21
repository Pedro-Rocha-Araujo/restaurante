import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Pedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(()=>{
    async function getPedidos() {
      const response = await axios.get("http://localhost:4000/pedidos")
      setPedidos([response.data[0], response.data[1]])
    }
    getPedidos()
  }, [])

  return (
    <section className="pedidos">
      <h2><Link to="/pedidos">Pedidos <i class="fa-solid fa-clipboard"></i></Link></h2>
      <div className="pedidos">

        {pedidos.map((pedido, index)=>{
          return (
            <div className="pedido">
              <div className="footer">
                <h3>Mesa {pedido.mesa}</h3>
                <i class="fa-solid fa-spinner"></i>
              </div>
            </div>
          )
        })}


        <div className="prato">
          <div className="footer">
            <h3><Link to="/novo-pedido">Adicionar pedido</Link></h3>
            <Link to="/novo-pedido"><i class="fa-solid fa-circle-plus fa-lg"></i></Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Pedidos