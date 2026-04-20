import { Link } from "react-router-dom"

function Header({ titulo, emoji }) {
  return (
    <header>
      <h1><Link to={"/home"}>{emoji} {titulo}</Link></h1>
    </header>
  )
}

export default Header