import "./home.css"
import Header from "../Header"
import Pratos from "./Pratos"
import Pedidos from "./Pedidos"

function Home() {
  return (
    <div className="home">
      <Header titulo="Home" emoji={<i className="fa-solid fa-house"></i>} />
      <Pratos />
      <Pedidos />
    </div>
  )
}

export default Home