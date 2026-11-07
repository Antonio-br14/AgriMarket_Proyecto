import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login, entrarComo } = useStore()
  const { push } = useToast()
  const nav = useNavigate()

  const entrar = () => {
    login({ id: 99, nombre: 'María Fernanda', rol: 'consumidor' })
    push('Bienvenido a AgriMarket')
    nav('/')
  }

  const rol = (r) => {
    entrarComo(r)
    push(r === 'productor' ? 'Ingresaste como productor' : 'Ingresaste como consumidor')
    nav(r === 'productor' ? '/panel' : '/')
  }

  return (
    <div className="caja">
      <h1>Ingresar</h1>
      <p className="sub">Acceda a su cuenta de AgriMarket.</p>
      <div className="campo">
        <label>Correo</label>
        <input type="email" defaultValue="maria@ejemplo.com" />
      </div>
      <div className="campo">
        <label>Contraseña</label>
        <input type="password" defaultValue="123456" />
      </div>
      <button className="btn bloque" onClick={entrar}>
        Ingresar
      </button>
      <p style={{ textAlign: 'center', marginTop: 14, color: 'var(--gris)' }}>
        ¿No tiene cuenta? <Link className="link" to="/registro">Regístrese</Link>
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid var(--borde)', margin: '18px 0' }} />
      <p className="pill" style={{ textAlign: 'center', marginBottom: 8 }}>
        Acceso rápido para la demostración:
      </p>
      <div className="fila">
        <button className="btn sec" onClick={() => rol('consumidor')}>
          Como consumidor
        </button>
        <button className="btn sec" onClick={() => rol('productor')}>
          Como productor
        </button>
      </div>
    </div>
  )
}
