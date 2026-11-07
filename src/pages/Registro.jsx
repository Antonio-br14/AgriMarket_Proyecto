import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'

export default function Registro() {
  const { registrar } = useStore()
  const { push } = useToast()
  const nav = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState('consumidor')
  const [error, setError] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Escribe tu nombre completo.')
      return
    }
    if (!email.includes('@')) {
      setError('Escribe un correo válido.')
      return
    }
    setError('')
    registrar({ nombre: nombre.trim(), email: email.trim(), rol })
    push('Cuenta creada. ¡Bienvenido a AgriMarket!')
    nav(rol === 'productor' ? '/panel' : '/')
  }

  return (
    <div className="caja">
      <h1>Crear cuenta</h1>
      <p className="sub">Regístrese como productor o consumidor.</p>
      <form onSubmit={enviar} noValidate>
        <div className="campo">
          <label>Nombre completo</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. María Fernanda" />
        </div>
        <div className="campo">
          <label>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div className="campo">
          <label>Contraseña</label>
          <input type="password" defaultValue="123456" />
        </div>
        <div className="campo">
          <label>Rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="consumidor">Consumidor</option>
            <option value="productor">Productor</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn bloque" type="submit">
          Registrarme
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 14, color: 'var(--gris)' }}>
        ¿Ya tiene cuenta? <Link className="link" to="/login">Ingrese</Link>
      </p>
    </div>
  )
}
