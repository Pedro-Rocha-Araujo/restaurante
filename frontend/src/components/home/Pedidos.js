import { Link } from "react-router-dom"

function Pedidos() {
  return (
    <section className="pedidos">
      <h2><Link to="/pedidos">Pedidos <i class="fa-solid fa-clipboard"></i></Link></h2>
      <div className="pedidos">
        <div className="pedido">
          <div className="footer">
            <h3>Mesa 1</h3>
            <i class="fa-solid fa-eye fa-lg"></i>
          </div>
        </div>
        <div className="prato">
          <div className="footer">
            <h3>Mesa 2</h3>
            <i class="fa-solid fa-eye fa-lg"></i>
          </div>
        </div>
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