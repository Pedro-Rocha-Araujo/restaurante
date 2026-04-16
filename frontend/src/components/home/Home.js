import "./home.css"
import Pratos from "./Pratos"
import Pedidos from "./Pedidos"

function Home() {
  return (
    <div className="home">
      <main>
        <header>
          <h1>Página inicial!</h1>
        </header>
        <Pratos />
        <Pedidos />
      </main>
    </div>
  )
}

export default Home