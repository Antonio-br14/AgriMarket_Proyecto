import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Inicio from './pages/Inicio.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Catalogo from './pages/Catalogo.jsx'
import Detalle from './pages/Detalle.jsx'
import Solicitud from './pages/Solicitud.jsx'
import Exito from './pages/Exito.jsx'
import Panel from './pages/Panel.jsx'
import Publicar from './pages/Publicar.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/solicitud" element={<Solicitud />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/editar/:id" element={<Publicar />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </main>
      <footer>AgriMarket - Prototipo funcional del MVP (React) · Purísima, Córdoba · 2026</footer>
    </>
  )
}
