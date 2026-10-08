import Header from "../Header"
import Card from "../home/card/Card"
import axios from "axios"
import {toast} from "react-toastify"
import { useState, useEffect } from "react"
import "./pratos.css"

function TodosPratos() {
  const [pratos, setPratos] = useState([])
  const [itemCard, setItemCard] = useState(null)

  useEffect(()=>{
    async function getPratos() {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:4000/pratos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPratos(response.data)
    }
    getPratos()
  }, [pratos, itemCard])

  async function setarId(id) {
    try{
      const response = await axios.get("http://localhost:4000/prato/"+id)
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
    <Header titulo="Pratos" emoji={<i className="fa-solid fa-utensils"></i>} />
    <section className="pratos">
      <h2> <i className="fa-solid fa-utensils"></i> Pratos Disponíveis</h2>
      <div className="pratos">
        {pratos.map((prato, index)=>{
          return (
            <div onClick={()=>setarId(prato._id)} key={index} className="prato">
                <img src={prato.foto} />
                <div className="footer">
                  <h3>{prato.nome}</h3>
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

export default TodosPratos