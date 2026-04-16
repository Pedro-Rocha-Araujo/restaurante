function Pratos() {
  return (
    <section className="pratos">
      <h2>Pratos disponíveis <i class="fa-solid fa-utensils"></i></h2>
      <div className="pratos">
        <div className="prato">
          <img src="https://img.freepik.com/fotos-gratis/closeup-de-carne-assada-com-molho-legumes-e-batatas-fritas-em-um-prato-sobre-a-mesa_181624-35847.jpg?semt=ais_hybrid&w=740&q=80" />
          <div className="footer">
            <h3>Arroz e feijão</h3>
            <i class="fa-solid fa-eye fa-lg"></i>
          </div>
        </div>
        <div className="prato">
          <img src="https://www.sabornamesa.com.br/media/k2/items/cache/10a451d868feb5fd854c1535dddc148e_XL.jpg" />
          <div className="footer">
            <h3>Arroz e feijão</h3>
            <i class="fa-solid fa-eye fa-lg"></i>
          </div>
        </div>
        <div className="prato">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/056/202/171/small/add-image-or-photo-icon-vector.jpg" />
          <div className="footer">
            <h3>Adicionar prato</h3>
            <i class="fa-solid fa-circle-plus fa-lg"></i>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pratos