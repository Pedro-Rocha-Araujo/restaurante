import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Card from "./card/Card"
import { useNavigate } from "react-router-dom"

function Pratos() {
  const [pratos, setPratos ] = useState([])
  const [itemCard, setItemCard] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    async function getPratos() {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:4000/pratos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const array = response.data
      setPratos(array.filter((_,i)=>{
        return i < 2
      }))
    }
    getPratos()
  }, [itemCard])

  async function setarId(id) {
    try{
      const response = await axios.get("http://localhost:4000/prato/"+id)
      setItemCard(response.data)
    } catch {
      toast.error("Erro!")
    }
  }

  return (
    <>
      {itemCard && (
        <Card itemCard={itemCard} setItemCard={setItemCard} />
      )}

      <section className="pratos">
        <h2><Link to="/pratos">Pratos <i className="fa-solid fa-utensils"></i></Link></h2>
        <div className="pratos">

          { pratos.length > 0 && (
            pratos.map((prato)=>{
              return (
                <div onClick={()=>setarId(prato._id)} id={prato._id} key={prato._id} className="prato">
                  <img src={prato.foto} />
                  <div className="footer">
                    <h3>{prato.nome}</h3>
                    <i className="fa-solid fa-eye fa-lg"></i>
                  </div>
                </div>
              )
            }))
          }

          <div onClick={()=>navigate("/novo-prato")} className="prato add">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg" />
            <div className="footer">
              <h3>Novo prato</h3>
              <i className="fa-solid fa-circle-plus fa-lg"></i>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Pratos