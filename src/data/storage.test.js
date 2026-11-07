import { describe, it, expect, beforeEach } from 'vitest'
import { money, load, save, KEYS } from './storage'

describe('money', () => {
  it('formatea valores en pesos colombianos', () => {
    expect(money(2500)).toBe('$2.500')
    expect(money(0)).toBe('$0')
  })
})

describe('storage', () => {
  beforeEach(() => localStorage.clear())

  it('guarda y recupera datos', () => {
    save(KEYS.carrito, [{ id: 1, cant: 2 }])
    expect(load(KEYS.carrito, [])).toEqual([{ id: 1, cant: 2 }])
  })

  it('devuelve el valor por defecto si no existe', () => {
    expect(load('clave_inexistente', [])).toEqual([])
  })
})
