import { Link } from 'react-router-dom'

export default function Exito() {
  return (
    <div className="exito">
      <div className="icono">✅</div>
      <h1>¡Solicitud enviada!</h1>
      <p className="sub">El productor recibió su solicitud y la confirmará pronto. Puede hacer seguimiento desde su panel.</p>
      <Link className="btn" to="/catalogo">Seguir comprando</Link>
      <Link className="btn sec" style={{ marginTop: 10 }} to="/">Ir al inicio</Link>
    </div>
  )
}
