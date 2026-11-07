import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { CATEGORIAS } from '../data/seed'

export default function Inicio() {
  const { productos } = useStore()

  return (
    <div>
      <div className="hero">
        <h1>Productos frescos, directo del productor</h1>
        <p>Conectamos a los pequeños productores de Purísima, Córdoba, con compradores locales. Compra fresco, paga un precio justo y apoya al campo.</p>
        <Link className="btn nar" to="/catalogo">Ver catálogo</Link>
        <Link className="btn sec" style={{ marginLeft: 10, background: 'transparent', color: '#fff', borderColor: '#fff' }} to="/registro">Quiero vender</Link>
      </div>

      <h2>Categorías</h2>
      <div className="grid">
        {CATEGORIAS.map((c) => (
          <Link className="card" key={c} to="/catalogo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="cuerpo">
              <div className="nombre">{c}</div>
              <div className="prod">Ver productos</div>
            </div>
          </Link>
        ))}
      </div>

      <h2>Productos destacados</h2>
      <div className="grid">
        {productos.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
