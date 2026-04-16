import "./home.css"
import Header from "../Header"
import Pratos from "./Pratos"
import Pedidos from "./Pedidos"

function Home() {
  return (
    <div className="home">
      <main>
        <Header titulo="Página Inicial" emoji={<i class="fa-solid fa-house"></i>} />
        <Pratos />
        <Pedidos />
      </main>
    </div>
  )
}

export default Home