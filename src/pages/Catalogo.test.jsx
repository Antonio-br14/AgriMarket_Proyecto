import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '../context/StoreContext'
import Catalogo from './Catalogo'

beforeEach(() => localStorage.clear())

describe('Catalogo', () => {
  it('muestra el titulo y al menos un producto', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <Catalogo />
        </StoreProvider>
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Catálogo' })).toBeInTheDocument()
    expect(screen.getByText('Plátano hartón')).toBeInTheDocument()
  })
})
