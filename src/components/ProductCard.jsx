import { Link } from 'react-router-dom'
import { money } from '../data/storage'

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <div className="foto">{p.emoji}</div>
      <div className="cuerpo">
        <div className="nombre">{p.nombre}</div>
        <div className="precio">{money(p.precio)} / {p.unidad}</div>
        <div className="prod">{p.productor} · {p.vereda}</div>
        <Link className="btn" style={{ marginTop: 8 }} to={`/producto/${p.id}`}>Ver producto</Link>
      </div>
    </div>
  )
}
