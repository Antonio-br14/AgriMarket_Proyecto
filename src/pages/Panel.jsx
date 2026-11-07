import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useToast } from '../context/ToastContext'
import { money } from '../data/storage'

export default function Panel() {
  const { user, productos, solicitudes, actualizarPerfil, eliminarProducto, responderSolicitud } =
    useStore()
  const { push } = useToast()
  const misProductos = productos.filter((p) => p.productor === 'José Ramón')
  const ventas = solicitudes.reduce((s, x) => s + x.total, 0)
  const [perfil, setPerfil] = useState({
    finca: user?.finca || 'Finca El Naranjal',
    vereda: user?.vereda || 'El Naranjal',
    telefono: user?.telefono || '',
  })

  const guardarPerfil = (e) => {
    e.preventDefault()
    actualizarPerfil(perfil)
    push('Perfil actualizado')
  }

  const eliminar = (id) => {
    eliminarProducto(id)
    push('Producto eliminado')
  }

  const responder = (id, estado) => {
    responderSolicitud(id, estado)
    push(estado === 'Aceptada' ? 'Solicitud aceptada' : 'Solicitud rechazada')
  }

  return (
    <div>
      <h1>Mi panel</h1>
      <p className="sub">Gestione su perfil, sus productos y las solicitudes recibidas.</p>

      <div className="panel-grid">
        <div className="stat">
          <div className="num">{misProductos.length}</div>
          <div className="lbl">Productos publicados</div>
        </div>
        <div className="stat">
          <div className="num">{solicitudes.length}</div>
          <div className="lbl">Solicitudes recibidas</div>
        </div>
        <div className="stat">
          <div className="num">{money(ventas)}</div>
          <div className="lbl">Ventas estimadas</div>
        </div>
      </div>

      <h2>Mi perfil de productor</h2>
      <form onSubmit={guardarPerfil} className="caja" style={{ maxWidth: 640, margin: 0 }}>
        <div className="fila">
          <div className="campo">
            <label>Finca</label>
            <input value={perfil.finca} onChange={(e) => setPerfil({ ...perfil, finca: e.target.value })} />
          </div>
          <div className="campo">
            <label>Vereda</label>
            <input value={perfil.vereda} onChange={(e) => setPerfil({ ...perfil, vereda: e.target.value })} />
          </div>
        </div>
        <div className="campo">
          <label>Teléfono de contacto</label>
          <input
            value={perfil.telefono}
            onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
            placeholder="Número de contacto"
          />
        </div>
        <button className="btn" type="submit">
          Guardar perfil
        </button>
      </form>

      <h2>Mis productos</h2>
      <Link className="btn" to="/publicar">
        + Publicar producto
      </Link>
      <div className="grid" style={{ marginTop: 14 }}>
        {misProductos.map((p) => (
          <div className="card" key={p.id}>
            <div className="foto">{p.emoji}</div>
            <div className="cuerpo">
              <div className="nombre">{p.nombre}</div>
              <div className="precio">
                {money(p.precio)} / {p.unidad}
              </div>
              <div className="prod">
                {p.productor} · {p.vereda}
              </div>
              <div className="fila" style={{ marginTop: 8 }}>
                <Link className="btn sec" to={`/editar/${p.id}`}>
                  Editar
                </Link>
                <button className="btn sec" onClick={() => eliminar(p.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Solicitudes recibidas</h2>
      {solicitudes.length > 0 ? (
        solicitudes.map((s) => (
          <div className="lista-item" key={s.id}>
            <div className="mini">📦</div>
            <div className="info">
              <b>Solicitud #{String(s.id).slice(-4)}</b>
              <small>
                {s.consumidor} · {s.fecha}
              </small>
            </div>
            <div className="total" style={{ fontSize: 16 }}>
              {money(s.total)}
            </div>
            {s.estado === 'Pendiente' ? (
              <div className="fila" style={{ maxWidth: 220 }}>
                <button className="btn" style={{ padding: '6px 10px' }} onClick={() => responder(s.id, 'Aceptada')}>
                  Aceptar
                </button>
                <button className="btn sec" style={{ padding: '6px 10px' }} onClick={() => responder(s.id, 'Rechazada')}>
                  Rechazar
                </button>
              </div>
            ) : (
              <span className={`etiqueta ${s.estado === 'Aceptada' ? '' : 'pend'}`}>{s.estado}</span>
            )}
          </div>
        ))
      ) : (
        <p style={{ color: 'var(--gris)' }}>Aún no hay solicitudes recibidas.</p>
      )}
    </div>
  )
}
