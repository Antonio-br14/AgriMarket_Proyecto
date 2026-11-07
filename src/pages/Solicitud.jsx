import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { money } from '../data/storage'

export default function Solicitud() {
  const { cart, removeFromCart, confirmar } = useStore()
  const { push } = useToast()
  const nav = useNavigate()
  const total = cart.reduce((s, i) => s + i.precio * i.cant, 0)
  const [nombre, setNombre] = useState('')
  const [dir, setDir] = useState('')
  const [tel, setTel] = useState('')
  const [error, setError] = useState('')

  const onConfirmar = (e) => {
    e.preventDefault()
    if (!nombre.trim() || !dir.trim() || !tel.trim()) {
      setError('Completa nombre, dirección y teléfono para continuar.')
      return
    }
    setError('')
    confirmar(nombre.trim())
    push('Solicitud enviada al productor')
    nav('/exito')
  }

  if (!cart.length) {
    return (
      <div>
        <h1>Mi solicitud de compra</h1>
        <p className="sub">Revise los productos y confirme su solicitud.</p>
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--borde)',
            borderRadius: 14,
            padding: 30,
            textAlign: 'center',
            color: 'var(--gris)',
          }}
        >
          Tu solicitud está vacía. <Link className="link" to="/catalogo">Ir al catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Mi solicitud de compra</h1>
      <p className="sub">Revise los productos y confirme su solicitud.</p>
      {cart.map((i, ix) => (
        <div className="lista-item" key={ix}>
          <div className="mini">{i.emoji}</div>
          <div className="info">
            <b>{i.nombre}</b>
            <small>
              {i.cant} {i.unidad} × {money(i.precio)}
            </small>
          </div>
          <div style={{ fontWeight: 800, color: 'var(--verde-osc)' }}>{money(i.precio * i.cant)}</div>
          <button className="btn sec" style={{ padding: '6px 10px' }} onClick={() => removeFromCart(ix)}>
            Quitar
          </button>
        </div>
      ))}
      <form onSubmit={onConfirmar} noValidate style={{ maxWidth: 520, marginTop: 18 }}>
        <div className="campo">
          <label>Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de quien recibe" />
        </div>
        <div className="campo">
          <label>Dirección</label>
          <input value={dir} onChange={(e) => setDir(e.target.value)} placeholder="Dirección de entrega" />
        </div>
        <div className="campo">
          <label>Teléfono</label>
          <input value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Número de contacto" />
        </div>
        <div className="campo">
          <label>Forma de entrega</label>
          <select>
            <option>Domicilio</option>
            <option>Recoger en finca</option>
            <option>Punto de encuentro</option>
          </select>
        </div>
        <p className="total" style={{ margin: '14px 0' }}>
          Total estimado: {money(total)}
        </p>
        {error && <p className="error">{error}</p>}
        <button className="btn nar bloque" type="submit">
          Confirmar solicitud
        </button>
      </form>
    </div>
  )
}
