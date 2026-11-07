import { createContext, useContext, useEffect, useState } from 'react'
import { KEYS, load, save } from '../data/storage'
import { seedData } from '../data/seed'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  seedData()

  const [user, setUser] = useState(() => load(KEYS.sesion, null))
  const [productos, setProductos] = useState(() => load(KEYS.productos, []))
  const [solicitudes, setSolicitudes] = useState(() => {
    const s = load(KEYS.solicitudes, [])
    if (s.length) return s
    // Ayuda para demostracion/capturas: #/panel?demo=panel
    if (typeof window !== 'undefined' && window.location.hash.includes('demo=panel')) {
      return [
        {
          id: 900001,
          items: [
            { id: 1, nombre: 'Plátano hartón', precio: 2500, cant: 2, unidad: 'kg', emoji: '🍌' },
            { id: 4, nombre: 'Lechuga', precio: 1500, cant: 1, unidad: 'unidad', emoji: '🥬' },
          ],
          total: 6500,
          estado: 'Pendiente',
          consumidor: 'María Fernanda',
          fecha: new Date().toLocaleDateString('es-CO'),
        },
      ]
    }
    return s
  })
  const [cart, setCart] = useState(() => {
    const c = load(KEYS.carrito, [])
    if (c.length) return c
    // Ayuda para demostracion/capturas: #/solicitud?demo=carrito
    if (typeof window !== 'undefined' && window.location.hash.includes('demo=carrito')) {
      return [
        { id: 1, nombre: 'Plátano hartón', precio: 2500, emoji: '🍌', cant: 2, unidad: 'kg' },
        { id: 4, nombre: 'Lechuga', precio: 1500, emoji: '🥬', cant: 1, unidad: 'unidad' },
      ]
    }
    return []
  })

  useEffect(() => { save(KEYS.sesion, user) }, [user])
  useEffect(() => { save(KEYS.productos, productos) }, [productos])
  useEffect(() => { save(KEYS.solicitudes, solicitudes) }, [solicitudes])
  useEffect(() => { save(KEYS.carrito, cart) }, [cart])

  const login = (u) => setUser(u)

  const entrarComo = (rol) => setUser(
    rol === 'productor'
      ? { id: 2, nombre: 'José Ramón', rol: 'productor', vereda: 'El Naranjal', finca: 'Finca El Naranjal' }
      : { id: 1, nombre: 'María Fernanda', rol: 'consumidor' }
  )

  const logout = () => {
    setUser(null)
    localStorage.removeItem(KEYS.sesion)
  }

  const registrar = (datos) => setUser({ id: Date.now(), ...datos })

  const addToCart = (p, cant) => setCart((prev) => {
    const ex = prev.find((i) => i.id === p.id)
    if (ex) return prev.map((i) => i.id === p.id ? { ...i, cant: i.cant + cant } : i)
    return [...prev, { id: p.id, nombre: p.nombre, precio: p.precio, emoji: p.emoji, cant, unidad: p.unidad }]
  })

  const removeFromCart = (ix) => setCart((prev) => prev.filter((_, i) => i !== ix))

  const confirmar = (consumidor) => {
    if (!cart.length) return 0
    const total = cart.reduce((s, i) => s + i.precio * i.cant, 0)
    setSolicitudes((prev) => [
      ...prev,
      { id: Date.now(), items: cart.slice(), total, estado: 'Pendiente', consumidor: consumidor || user?.nombre || 'Invitado', fecha: new Date().toLocaleDateString('es-CO') },
    ])
    setCart([])
    return total
  }

  const publicar = (datos) => {
    setProductos((prev) => [
      { id: Date.now(), ...datos, productor: 'José Ramón', vereda: 'El Naranjal' },
      ...prev,
    ])
  }

  const actualizarProducto = (id, datos) =>
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...datos } : p)))

  const eliminarProducto = (id) => setProductos((prev) => prev.filter((p) => p.id !== id))

  const responderSolicitud = (id, estado) =>
    setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, estado } : s)))

  const actualizarPerfil = (datos) => setUser((prev) => ({ ...prev, ...datos }))

  const value = {
    user,
    productos,
    solicitudes,
    cart,
    login,
    entrarComo,
    logout,
    registrar,
    addToCart,
    removeFromCart,
    confirmar,
    publicar,
    actualizarProducto,
    eliminarProducto,
    responderSolicitud,
    actualizarPerfil,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
