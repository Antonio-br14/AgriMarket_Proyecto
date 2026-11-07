import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { CATEGORIAS } from '../data/seed'

const VACIO = {
  nombre: '',
  categoria: 'Frutas',
  unidad: 'kg',
  precio: 2500,
  cantidad: 50,
  desc: '',
  emoji: '🌽',
}

export default function Publicar() {
  const { id } = useParams()
  const editando = Boolean(id)
  const { productos, publicar, actualizarProducto } = useStore()
  const { push } = useToast()
  const nav = useNavigate()
  const actual = editando ? productos.find((p) => String(p.id) === String(id)) : null
  const [error, setError] = useState('')
  const [f, setF] = useState(() =>
    actual
      ? {
          nombre: actual.nombre,
          categoria: actual.categoria,
          unidad: actual.unidad,
          precio: actual.precio,
          cantidad: actual.cantidad,
          desc: actual.desc,
          emoji: actual.emoji,
        }
      : VACIO,
  )

  if (editando && !actual) return <p>Producto no encontrado.</p>

  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }))

  const enviar = (e) => {
    e.preventDefault()
    if (!f.nombre.trim()) {
      setError('Escribe el nombre del producto.')
      return
    }
    if (!f.precio || f.precio <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }
    setError('')
    if (editando) {
      actualizarProducto(actual.id, { ...f, nombre: f.nombre.trim() })
      push('Producto actualizado')
    } else {
      publicar({ ...f, nombre: f.nombre.trim() })
      push('Producto publicado')
    }
    nav('/panel')
  }

  return (
    <div className="caja" style={{ maxWidth: 560 }}>
      <h1>{editando ? 'Editar producto' : 'Publicar producto'}</h1>
      <p className="sub">
        {editando ? 'Actualice los datos del producto.' : 'Registre un producto para ofrecerlo en el catálogo.'}
      </p>
      <form onSubmit={enviar} noValidate>
        <div className="campo">
          <label>Nombre del producto</label>
          <input value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Plátano hartón" />
        </div>
        <div className="fila">
          <div className="campo">
            <label>Categoría</label>
            <select value={f.categoria} onChange={(e) => set('categoria', e.target.value)}>
              {CATEGORIAS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label>Unidad</label>
            <select value={f.unidad} onChange={(e) => set('unidad', e.target.value)}>
              <option>kg</option>
              <option>unidad</option>
              <option>bulto</option>
              <option>docena</option>
            </select>
          </div>
        </div>
        <div className="fila">
          <div className="campo">
            <label>Precio</label>
            <input type="number" value={f.precio} onChange={(e) => set('precio', parseInt(e.target.value) || 0)} min="1" />
          </div>
          <div className="campo">
            <label>Cantidad</label>
            <input type="number" value={f.cantidad} onChange={(e) => set('cantidad', parseInt(e.target.value) || 0)} min="1" />
          </div>
        </div>
        <div className="campo">
          <label>Descripción</label>
          <textarea rows="3" value={f.desc} onChange={(e) => set('desc', e.target.value)} placeholder="Detalle del producto, cosecha, vereda..." />
        </div>
        <div className="campo">
          <label>Imagen (emoji)</label>
          <input value={f.emoji} maxLength="4" onChange={(e) => set('emoji', e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn nar bloque" type="submit">
          {editando ? 'Guardar cambios' : 'Publicar'}
        </button>
        <button className="btn sec bloque" style={{ marginTop: 10 }} type="button" onClick={() => nav('/panel')}>
          Cancelar
        </button>
      </form>
    </div>
  )
}
