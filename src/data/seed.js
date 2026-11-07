import { KEYS, save } from './storage'

export const CATEGORIAS = ['Frutas', 'Hortalizas', 'Tubérculos', 'Cereales', 'Otros']

export function seedData() {
  if (!localStorage.getItem(KEYS.productos)) {
    save(KEYS.productos, [
      { id: 1, nombre: 'Plátano hartón', categoria: 'Frutas', precio: 2500, unidad: 'kg', cantidad: 80, emoji: '🍌', productor: 'José Ramón', vereda: 'El Naranjal', desc: 'Plátano fresco de cosecha reciente.' },
      { id: 2, nombre: 'Yuca', categoria: 'Tubérculos', precio: 1800, unidad: 'kg', cantidad: 60, emoji: '🥔', productor: 'María López', vereda: 'La Esperanza', desc: 'Yuca de buena calidad, recién cosechada.' },
      { id: 3, nombre: 'Maíz', categoria: 'Cereales', precio: 2200, unidad: 'kg', cantidad: 100, emoji: '🌽', productor: 'Pedro Ruiz', vereda: 'El Cedro', desc: 'Maíz seco, listo para moler.' },
      { id: 4, nombre: 'Lechuga', categoria: 'Hortalizas', precio: 1500, unidad: 'unidad', cantidad: 40, emoji: '🥬', productor: 'Ana Gómez', vereda: 'El Naranjal', desc: 'Lechuga fresca y crujiente.' },
      { id: 5, nombre: 'Cacao', categoria: 'Otros', precio: 8000, unidad: 'kg', cantidad: 30, emoji: '🍫', productor: 'José Ramón', vereda: 'El Naranjal', desc: 'Cacao de aroma, fermentado y seco.' },
      { id: 6, nombre: 'Naranja', categoria: 'Frutas', precio: 2000, unidad: 'kg', cantidad: 70, emoji: '🍊', productor: 'María López', vereda: 'La Esperanza', desc: 'Naranja dulce para jugo.' },
      { id: 7, nombre: 'Cilantro', categoria: 'Hortalizas', precio: 800, unidad: 'unidad', cantidad: 50, emoji: '🌿', productor: 'Ana Gómez', vereda: 'El Naranjal', desc: 'Cilantro fresco aromático.' },
    ])
  }
  if (!localStorage.getItem(KEYS.usuarios)) {
    save(KEYS.usuarios, [
      { id: 1, nombre: 'María Fernanda', email: 'maria@ejemplo.com', pass: '123456', rol: 'consumidor' },
      { id: 2, nombre: 'José Ramón', email: 'jose@ejemplo.com', pass: '123456', rol: 'productor', finca: 'Finca El Naranjal', vereda: 'El Naranjal' },
    ])
  }
  if (!localStorage.getItem(KEYS.solicitudes)) save(KEYS.solicitudes, [])
}
