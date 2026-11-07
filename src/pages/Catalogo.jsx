import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import { CATEGORIAS } from '../data/seed'

export default function Catalogo() {
  const { productos } = useStore()
  const [cat, setCat] = useState('Todos')
  const [q, setQ] = useState('')

  let ps = productos
  if (cat !== 'Todos') ps = ps.filter((p) => p.categoria === cat)
  if (q) ps = ps.filter((p) => (p.nombre + ' ' + p.productor).toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <h1>Catálogo</h1>
      <p className="sub">Explore los productos disponibles por categoría.</p>
      <div className="barra-buscar">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar producto o productor..." />
        <button className="btn">Buscar</button>
      </div>
      <div className="cat">
        {['Todos', ...CATEGORIAS].map((c) => (
          <button key={c} className={cat === c ? 'activo' : ''} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {ps.length > 0
        ? <div className="grid">{ps.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        : <p style={{ color: 'var(--gris)' }}>No se encontraron productos.</p>}
    </div>
  )
}
