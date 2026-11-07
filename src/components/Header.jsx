import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Leaf,
  Store,
  ShoppingCart,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Header() {
  const { user, cart, logout } = useStore()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const count = cart.reduce((s, i) => s + i.cant, 0)

  const salir = () => {
    logout()
    setOpen(false)
    nav('/login')
  }

  const cls = ({ isActive }) => (isActive ? 'activo' : '')
  const close = () => setOpen(false)

  return (
    <header>
      <div className="barra">
        <Link to="/" className="logo" onClick={close}>
          <Leaf size={20} /> Agri<span>Market</span>
        </Link>

        <button
          className="menu-btn"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={open ? 'abierto' : ''}>
          <NavLink to="/" end className={cls} onClick={close}>
            <Store size={16} /> Inicio
          </NavLink>
          <NavLink to="/catalogo" className={cls} onClick={close}>
            Catálogo
          </NavLink>
          <NavLink to="/panel" className={cls} onClick={close}>
            <LayoutDashboard size={16} /> Mi panel
          </NavLink>
          <NavLink to="/solicitud" className={cls} onClick={close}>
            <ShoppingCart size={16} /> Carrito ({count})
          </NavLink>
          {user ? (
            <button className="salir" onClick={salir}>
              <LogOut size={16} /> Salir
            </button>
          ) : (
            <NavLink to="/login" className={cls} onClick={close}>
              <User size={16} /> Ingresar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
