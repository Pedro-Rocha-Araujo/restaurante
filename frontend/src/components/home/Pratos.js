import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Card from "./card/Card"

function Pratos() {
  const [pratos, setPratos ] = useState([])
  const [itemCard, setItemCard] = useState(null)

  useEffect(()=>{
    async function getPratos() {
      const response = await axios.get("http://localhost:4000/pratos")
      let lista = [response.data[0], response.data[1]]
      console.log(lista)
      setPratos(lista)
    }
    getPratos()
  }, [itemCard])

  async function setarId(id) {
    try{
      const response = await axios.get("http://localhost:4000/prato/"+id)
      console.log(response.data)
      setItemCard(response.data)
    } catch {
      toast.error("Erro ao buscar o prato!")
    }
  }

  return (
    <>
      {itemCard && (
        <Card itemCard={itemCard} setItemCard={setItemCard} />
      )}
      <section className="pratos">
        <h2><Link to="/pratos">Pratos disponíveis <i class="fa-solid fa-utensils"></i></Link></h2>
        <div className="pratos">
          {pratos.map((prato, index)=>{
            return(
              <div id={prato._id} key={prato.key} className="prato">
                <img src={prato.foto} />
                <div className="footer">
                  <h3>{prato.nome}</h3>
                  <i onClick={()=>setarId(prato._id)} className="fa-solid fa-eye fa-lg"></i>
                </div>
              </div>
            )
          })}
          <div className="prato">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg" />
            <div className="footer">
              <h3><Link to="/novo-prato">Adicionar prato</Link></h3>
              <Link to="/novo-prato"><i className="fa-solid fa-circle-plus fa-lg"></i></Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Pratos