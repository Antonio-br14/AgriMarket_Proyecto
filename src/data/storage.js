export const KEYS = {
  usuarios: 'agri_usuarios',
  productos: 'agri_productos',
  solicitudes: 'agri_solicitudes',
  sesion: 'agri_sesion',
  carrito: 'agri_carrito',
}

export const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const money = (n) => '$' + Number(n).toLocaleString('es-CO')
