import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { money } from '../data/storage'

export default function Detalle() {
  const { id } = useParams()
  const { productos, addToCart } = useStore()
  const { push } = useToast()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)

  const p = productos.find((x) => String(x.id) === String(id))
  if (!p) return <p>Producto no encontrado.</p>

  const agregar = () => {
    addToCart(p, qty)
    push('Producto agregado a la solicitud')
    nav('/solicitud')
  }

  return (
    <div>
      <p>
        <Link className="link" to="/catalogo">
          ← Volver al catálogo
        </Link>
      </p>
      <div className="detalle">
        <div className="foto">{p.emoji}</div>
        <div>
          <span className="etiqueta">{p.categoria}</span>
          <h1 style={{ marginTop: 10 }}>{p.nombre}</h1>
          <p style={{ color: 'var(--gris)', margin: '4px 0 12px' }}>
            Productor: {p.productor} · {p.vereda}
          </p>
          <div className="total" style={{ marginBottom: 16 }}>
            {money(p.precio)} / {p.unidad}
          </div>
          <p style={{ color: 'var(--gris)' }}>{p.desc}</p>
          <div className="campo" style={{ maxWidth: 180, marginTop: 16 }}>
            <label>Cantidad</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
          </div>
          <button className="btn nar bloque" onClick={agregar}>
            Agregar a la solicitud
          </button>
          <Link className="btn sec bloque" style={{ marginTop: 10 }} to="/catalogo">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
